const { BN, expectRevert } = require('@openzeppelin/test-helpers');

const { shouldBehaveLikeERC20Base } = require('./token/ERC20/behaviours/ERC20Base.behaviour');

const ERC20Base = artifacts.require('ERC20Base');

contract('ERC20Base', function ([owner, anotherAccount, minter, operator, recipient, thirdParty]) {
  const _name = 'ERC20Base';
  const _symbol = 'ERC20';
  const _decimals = new BN(18);
  const _cap = new BN(200000000);
  const _initialSupply = new BN(100000000);

  context('creating valid token', function () {
    describe('as a ERC20Capped', function () {
      it('requires a non-zero cap', async function () {
        await expectRevert(
          ERC20Base.new(
            _name,
            _symbol,
            _decimals,
            0,
            _initialSupply,
            false,
            { from: owner },
          ),
          'ERC20Capped: cap is 0',
        );
      });
    });

    describe('as a ERC20Base', function () {
      describe('without initial supply', function () {
        beforeEach(async function () {
          this.token = await ERC20Base.new(
            _name,
            _symbol,
            _decimals,
            _cap,
            0,
            false,
            false,
            { from: owner },
          );
        });

        describe('once deployed', function () {
          it('total supply should be equal to zero', async function () {
            (await this.token.totalSupply()).should.be.bignumber.equal(new BN(0));
          });

          it('owner balance should be equal to zero', async function () {
            (await this.token.balanceOf(owner)).should.be.bignumber.equal(new BN(0));
          });

          it('mintingFinished should be false', async function () {
            (await this.token.mintingFinished()).should.be.equal(false);
          });
        });
      });

      describe('with initial supply', function () {
        beforeEach(async function () {
          this.token = await ERC20Base.new(
            _name,
            _symbol,
            _decimals,
            _cap,
            _initialSupply,
            false,
            false,
            { from: owner },
          );
        });

        describe('once deployed', function () {
          it('total supply should be equal to initial supply', async function () {
            (await this.token.totalSupply()).should.be.bignumber.equal(_initialSupply);
          });

          it('owner balance should be equal to initial supply', async function () {
            (await this.token.balanceOf(owner)).should.be.bignumber.equal(_initialSupply);
          });

          it('mintingFinished should be false', async function () {
            (await this.token.mintingFinished()).should.be.equal(false);
          });
        });
      });

      describe('with transfer enabled during deploy', function () {
        beforeEach(async function () {
          this.token = await ERC20Base.new(
            _name,
            _symbol,
            _decimals,
            _cap,
            _initialSupply,
            true,
            false,
            { from: owner },
          );
        });

        it('transferEnabled should be true', async function () {
          (await this.token.transferEnabled()).should.be.equal(true);
        });
      });

      describe('with transfer not enabled during deploy', function () {
        beforeEach(async function () {
          this.token = await ERC20Base.new(
            _name,
            _symbol,
            _decimals,
            _cap,
            _initialSupply,
            false,
            false,
            { from: owner },
          );
        });

        it('transferEnabled should be false', async function () {
          (await this.token.transferEnabled()).should.be.equal(false);
        });
      });
    });
  });

  context('once deployed', function () {
    beforeEach(async function () {
      this.token = await ERC20Base.new(
        _name,
        _symbol,
        _decimals,
        _cap,
        _initialSupply,
        false,
        false,
        { from: owner },
      );
    });

    shouldBehaveLikeERC20Base(
      [owner, anotherAccount, minter, operator, recipient, thirdParty],
      [_name, _symbol, _decimals, _cap, _initialSupply],
    );
  });
});
