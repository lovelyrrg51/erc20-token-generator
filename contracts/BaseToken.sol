// SPDX-License-Identifier: MIT

pragma solidity ^0.7.1;

// import "@vittominacori/erc20-token/contracts/ERC20Base.sol";
import "./ERC20Base.sol";

/**
 * @title BaseToken
 * @author LionKing
 * @dev Implementation of the BaseToken
 */
contract BaseToken is ERC20Base {

  string private constant _GENERATOR = "ERC20Token Generator";
  string private constant _VERSION = "v1.0.0";

  constructor (
    string memory name,
    string memory symbol,
    uint8 decimals,
    uint256 cap,
    uint256 initialSupply,
    bool transferEnabled,
    bool mintingFinished
  ) ERC20Base(name, symbol, decimals, cap, initialSupply, transferEnabled, mintingFinished) {}

  /**
   * @dev Returns the token generator tool.
   */
  function generator() public pure returns (string memory) {
    return _GENERATOR;
  }

  /**
   * @dev Returns the token generator version.
   */
  function version() public pure returns (string memory) {
    return _VERSION;
  }
}
