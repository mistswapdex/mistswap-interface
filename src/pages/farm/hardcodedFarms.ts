import { ChainId, MASTERCHEF_ADDRESS, Token, WBCH } from "@mistswapdex/sdk";
import { MIST, FLEXUSD } from '../../config/tokens'
import { usePendingSushi } from "../../features/onsen/hooks";
import usePool from "../../hooks/usePool";

export const hardcodedPairs = {
  [ChainId.SMARTBCH]: {
    "0x674A71E69fe8D5cCff6fdcF9F1Fa4262Aa14b154": {
      farmId: 7,
      allocPoint: 318514134,
      token0: MIST[ChainId.SMARTBCH],
      token1: WBCH[ChainId.SMARTBCH],
    },
    "0x437E444365aD9ed788e8f255c908bceAd5AEA645": {
      farmId: 8,
      allocPoint: 66155663,
      token0: MIST[ChainId.SMARTBCH],
      token1: FLEXUSD,
    },
    "0x80F712670d268cf2C05e7162674c7466c940eBE3": {
      farmId: 0,
      allocPoint: 126507317,
      token0: new Token(ChainId.SMARTBCH, '0x77CB87b57F54667978Eb1B199b28a0db8C8E1c0B', 18, 'EBEN', 'Green Ben'),
      token1: WBCH[ChainId.SMARTBCH],
    },
    "0x24f011f12Ea45AfaDb1D4245bA15dCAB38B43D13": {
      farmId: 1,
      allocPoint: 234573255,
      token0: FLEXUSD,
      token1: WBCH[ChainId.SMARTBCH],
    },
    "0x4fF52e9D7824EC9b4e0189F11B5aA0F02b459b03": {
      farmId: 2,
      allocPoint: 15771032,
      token0: new Token(ChainId.SMARTBCH, '0x98Dd7eC28FB43b3C4c770AE532417015fa939Dd3', 18, 'FLEX', 'FLEX Coin'),
      token1: FLEXUSD,
    },
    "0x1EE39F93450d80981c169E59C8A641a3bC853A09": {
      farmId: 3,
      allocPoint: 9347390,
      token0: new Token(ChainId.SMARTBCH, '0xff3ed63bf8bc9303ea0a7e1215ba2f82d569799e', 18, 'ORB', 'ORB'),
      token1: WBCH[ChainId.SMARTBCH],
    },
    "0xc98552Ad7DFC5daabAd2660DF378e0070ca75Efc": {
      farmId: 4,
      allocPoint: 7205117,
      token0: new Token(ChainId.SMARTBCH, '0xc70c7718C7f1CCd906534C2c4a76914173EC2c44', 18, 'KTH', 'Knuth'),
      token1: WBCH[ChainId.SMARTBCH],
    },
    "0x287a276401caDBe50d5C0398137490E6d45830Dd": {
      farmId: 5,
      allocPoint: 10799358,
      token0: new Token(ChainId.SMARTBCH, '0xe11829a7d5d8806bb36e118461a1012588fafd89', 18, 'SPICE', 'SPICE'),
      token1: WBCH[ChainId.SMARTBCH],
    },
    "0x41075d2Ea8BEF1CAfb24D9Bd2061b620cbc05B60": {
      farmId: 6,
      allocPoint: 3986271,
      token0: new Token(ChainId.SMARTBCH, '0x675E1d6FcE8C7cC091aED06A68D079489450338a', 18, 'ARG', 'Bitcoin Cash Argentina'),
      token1: WBCH[ChainId.SMARTBCH],
    },
    "0xc47B0B4B51EE06De0daF02517D78f0473B776633": {
      farmId: 9,
      allocPoint: 46947298,
      token0: new Token(ChainId.SMARTBCH, '0x265bD28d79400D55a1665707Fa14A72978FA6043', 2, 'CATS', 'CashCats'),
      token1: WBCH[ChainId.SMARTBCH],
    },
    "0xD6EcaDB40b35D17f739Ec27285759d0ca119e3A1": {
      farmId: 10,
      allocPoint: 18884178,
      token0: new Token(ChainId.SMARTBCH, '0x3d13DaFcCA3a188DB340c81414239Bc2be312Ec9', 18, 'AXIEBCH', 'AxieBCH'),
      token1: WBCH[ChainId.SMARTBCH],
    },
    "0xFCf26E0EB200692B3002f941eea0486d2E901aA9": {
      farmId: 11,
      allocPoint: 7882561,
      token0: new Token(ChainId.SMARTBCH, '0x2f309b9d47b1ce7f0ec30a26bab2deab8c4ea5e9', 18, 'SHIBBCH', 'Shiba BCH'),
      token1: WBCH[ChainId.SMARTBCH],
    },
    "0xCFcBC90e617a3996355761b52dF2830B7b6718d0": {
      farmId: 12,
      allocPoint: 5076782,
      token0: new Token(ChainId.SMARTBCH, '0x741746C2Cf4117730d7f087e8492dF595b4fd283', 18, 'DOGE', 'DOGEBCH'),
      token1: WBCH[ChainId.SMARTBCH],
    },
    "0xf9D33ABfaF59fd19077f44399A8971621Cd2eA55": {
      farmId: 13,
      allocPoint: 5315934,
      token0: new Token(ChainId.SMARTBCH, '0xFfA2394B61D3dE16538a2Bbf3491297Cc5a7C79a', 18, 'UAT', 'UatX Token'),
      token1: WBCH[ChainId.SMARTBCH],
    },
    "0xCabdb1321CEAb169935a0c9d4c856250766C3df7": {
      farmId: 14,
      allocPoint: 3532595,
      token0: new Token(ChainId.SMARTBCH, '0xB5b1939ef0a3743d0Ae9282DbA62312b614A5Ac0', 18, 'POTA', 'Potato'),
      token1: WBCH[ChainId.SMARTBCH],
    },
    "0xbE48dC2353a460668A5D859C66e4472661581998": {
      farmId: 15,
      allocPoint: 13393564,
      token0: new Token(ChainId.SMARTBCH, '0xF2d4D9c65C2d1080ac9e1895F6a32045741831Cd', 2, 'HONK', 'Honk'),
      token1: WBCH[ChainId.SMARTBCH],
    },
    "0x12E03015A85A0c2c1eca69486147608ABB0b801c": {
      farmId: 16,
      allocPoint: 10866453,
      token0: FLEXUSD,
      token1: new Token(ChainId.SMARTBCH, '0x2f309b9d47b1ce7f0ec30a26bab2deab8c4ea5e9', 18, 'SHIBBCH', 'Shiba BCH'),
    },
    "0x6B68f5D7d0531207a01e9AC16cfCd223D2139D28": {
      farmId: 17,
      allocPoint: 2822381,
      token0: new Token(ChainId.SMARTBCH, '0x7eBeAdb95724a006aFaF2F1f051B13F4eBEBf711', 2, '$KITTEN', 'CashKitten'),
      token1: WBCH[ChainId.SMARTBCH],
    },
    "0x24615e918AD078900BfE13F4cd26876Bae64dD75": {
      farmId: 18,
      allocPoint: 6924307,
      token0: new Token(ChainId.SMARTBCH, '0x0b00366fBF7037E9d75E4A569ab27dAB84759302', 18, 'LAW', 'LAWTOKEN'),
      token1: WBCH[ChainId.SMARTBCH],
    },
    "0xa331430473ABA2337698fD95a7c2fCf376DEbFb1": {
      farmId: 19,
      allocPoint: 3695170,
      token0: new Token(ChainId.SMARTBCH, '0xC41C680c60309d4646379eD62020c534eB67b6f4', 18, 'XMIST', 'MISTbar'),
      token1: WBCH[ChainId.SMARTBCH],
    },
    "0x1c47c2a72e86B9B488f436F7aC76ACc61e531926": {
      farmId: 20,
      allocPoint: 3521488,
      token0: new Token(ChainId.SMARTBCH, '0x481De06DCA0198844faA36FCa04Db364e5c2f86C', 6, 'MAZE', 'MAZE'),
      token1: WBCH[ChainId.SMARTBCH],
    },
    "0xA32B73445dBc075dA5054503171362D790164dC9": {
      farmId: 21,
      allocPoint: 0,
      token0: new Token(ChainId.SMARTBCH, '0x4F1480ba79F7477230ec3b2eCc868E8221925072', 18, 'KONRA', 'Konra'),
      token1: WBCH[ChainId.SMARTBCH],
    },
    "0xE3e155c22685F7ceAB3F429CA60f302bCFb13616": {
      farmId: 22,
      allocPoint: 2915526,
      token0: new Token(ChainId.SMARTBCH, '0xB5b1939ef0a3743d0Ae9282DbA62312b614A5Ac0', 18, 'POTA', 'Potato'),
      token1: FLEXUSD,
    },
    "0x0663B29E3CAa8F2DB0313eA8B3E942a0431429cf": {
      farmId: 23,
      allocPoint: 4309558,
      token0: MIST[ChainId.SMARTBCH],
      token1: new Token(ChainId.SMARTBCH, '0xC41C680c60309d4646379eD62020c534eB67b6f4', 18, 'XMIST', 'MISTbar'),
    },
    "0x211c0d74b1213A40Bdfd61490A9893353544ea46": {
      farmId: 24,
      allocPoint: 0,
      token0: new Token(ChainId.SMARTBCH, '0x5a3bB59F34D60E9EB5643Fb80C8D712275F6a96A', 18, 'PHA', 'Alpha'),
      token1: WBCH[ChainId.SMARTBCH],
    },
    "0x8e5EdB62775c1Cd003804Ec2a8242E5E0393876b": {
      farmId: 25,
      allocPoint: 0,
      token0: new Token(ChainId.SMARTBCH, '0x80453ACDfE0073D6743B27D72e06F48777EeAd80', 0, 'ZOMBIE', 'ZOMBIE'),
      token1: WBCH[ChainId.SMARTBCH],
    },
    "0x49260567a5610414954a1D8F0E7774104FC5CAED": {
      farmId: 26,
      allocPoint: 3235068,
      token0: new Token(ChainId.SMARTBCH, '0x98Dd7eC28FB43b3C4c770AE532417015fa939Dd3', 18, 'FLEX', 'FLEX Coin'),
      token1: WBCH[ChainId.SMARTBCH],
    },
    "0x64c379ab93b859AdA71b8AbACA77BeD104a5DbCa": {
      farmId: 27,
      allocPoint: 5859435,
      token0: new Token(ChainId.SMARTBCH, '0x9288df32951386A8254aEaF80a66B78cCaf75b82', 18, 'sBUSD', 'Smart BUSD'),
      token1: WBCH[ChainId.SMARTBCH],
    },
    "0xFEC4202E22d0cd950aFC52622114e787FFFa0F53": {
      farmId: 28,
      allocPoint: 0,
      token0: new Token(ChainId.SMARTBCH, '0xFC27A40259f5d36F647b1142443Ed8941334C608', 18, 'C4Q', 'C4Q'),
      token1: WBCH[ChainId.SMARTBCH],
    },
    "0x98A03761Fe62b9A1FD7888D86f70E94a40ACD511": {
      farmId: 29,
      allocPoint: 0,
      token0: new Token(ChainId.SMARTBCH, '0xB24D7763516bca9656779d760be9a32490f46E27', 18, 'HODL', 'HODL'),
      token1: WBCH[ChainId.SMARTBCH],
    },
    "0x8221D04A71FcD0Dd3d096cB3B49E22918095933F": {
      farmId: 30,
      allocPoint: 23094301,
      token0: new Token(ChainId.SMARTBCH, '0x9192940099fDB2338B928DE2cad9Cd1525fEa881', 18, 'BPAD', 'BCHPad'),
      token1: WBCH[ChainId.SMARTBCH],
    },
    "0x5775D98022590dc60E9c4Ae0a1c56bF1fD8fcaDC": {
      farmId: 31,
      allocPoint: 19776601,
      token0: new Token(ChainId.SMARTBCH, '0x7642Df81b5BEAeEb331cc5A104bd13Ba68c34B91', 18, 'CLY', 'Celery'),
      token1: WBCH[ChainId.SMARTBCH],
    },
    "0x20943aD7855bdE06Dd41BB89C9D2efE05DB329EC": {
      farmId: 32,
      allocPoint: 7942071,
      token0: new Token(ChainId.SMARTBCH, '0x6732E55Ac3ECa734F54C26Bd8DF4eED52Fb79a6E', 18, 'JOY', 'Joystick'),
      token1: WBCH[ChainId.SMARTBCH],
    },
    "0xB02A135992478a485D9DD771092CdD8B4487594A": {
      farmId: 33,
      allocPoint: 7623944,
      token0: new Token(ChainId.SMARTBCH, '0xAFACB0004A91267b58e720E13DF570Dc6863c854', 18, 'STO', 'SmartBCH Token Observer'),
      token1: WBCH[ChainId.SMARTBCH],
    },
    "0xE75Ec02F28bC0E1ca1794FbFFe8229ac1662075E": {
      farmId: 34,
      allocPoint: 3521227,
      token0: new Token(ChainId.SMARTBCH, '0x252fd94f3Fb53D3D62F4FEc708501ACd59A57e52', 18, 'HAM', 'HAM Token'),
      token1: WBCH[ChainId.SMARTBCH],
    },
  },
  [ChainId.SMARTBCH_AMBER]: {
    "0x07DE6fc05597E0E4c92C83637A8a0CA411f3a769": {
      farmId: 0,
      allocPoint: 1000,
      token0: WBCH[ChainId.SMARTBCH_AMBER],
      token1: new Token(ChainId.SMARTBCH_AMBER, '0xC6F80cF669Ab9e4BE07B78032b4821ed5612A9ce', 18, 'sc', 'testcoin2'),
    },
  }
};

// return array of farms and swap pairs fetched from RPC
export function useHardcodedFarms(chainId) {
  const farms = []
  const swapPairs = []

  for (const [pairAddress, pair] of Object.entries(hardcodedPairs[chainId] as any[])) {
    swapPairs.push({
      id: pairAddress,
      reserveUSD: "100000",
      totalSupply: "0",
      timestamp: "1599830986",
      token0: {
        id: pair.token0.address,
        name: pair.token0.name,
        symbol: pair.token0.symbol,
      },
      token1: {
        id: pair.token1.address,
        name: pair.token1.name,
        symbol: pair.token1.symbol,
      },
    })

    const f = {
      pair: pairAddress,
      symbol: `${hardcodedPairs[chainId][pairAddress].token0.symbol}-${hardcodedPairs[chainId][pairAddress].token1.symbol}`,
      // eslint-disable-next-line react-hooks/rules-of-hooks
      pool: usePool(pairAddress),
      allocPoint: pair.allocPoint,
      balance: "1000000000000000000",
      chef: 0,
      id: pair.farmId,
      pendingSushi: undefined,
      pending: 0,
      owner: {
        id: MASTERCHEF_ADDRESS[chainId],
        sushiPerBlock: "100000000000000000000",
        totalAllocPoint: "999949643"
      },
      userCount: 1,
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    f.pendingSushi = usePendingSushi(f)
    f.pending = Number.parseFloat(f.pendingSushi?.toFixed())

    farms.push(f);
  }

  return [farms, swapPairs];
}