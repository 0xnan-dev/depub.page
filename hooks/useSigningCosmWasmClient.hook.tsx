import { useEffect, useState } from 'react';
import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import Debug from 'debug';
import { payloadId } from '@walletconnect/utils';
import { AccountData, OfflineSigner } from '@cosmjs/proto-signing';
import { SignDoc } from 'cosmjs-types/cosmos/tx/v1beta1/tx';

const debug = Debug('web:useSigningCosmWasmClient');
const PUBLIC_RPC_ENDPOINT = process.env.NEXT_PUBLIC_CHAIN_RPC_ENDPOINT || '';
const PUBLIC_CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID || '';
const KEY_WALLET_CONNECT_ACCOUNT_PREFIX = 'KEY_WALLET_CONNECT_ACCOUNT_PREFIX';
const KEY_WALLET_CONNECT = 'walletconnect';
const KEY_CONNECTED_WALLET_TYPE = 'KEY_CONNECTED_WALLET_TYPE';
const isTestnet = /testnet/.test(PUBLIC_CHAIN_ID);

type ConnectedWalletType = 'keplr' | 'likerland_app';

export interface ISigningCosmWasmClientContext {
  walletAddress: string | null;
  signingClient: SigningCosmWasmClient | null;
  offlineSigner: OfflineSigner | null;
  isLoading: boolean;
  error: string | null;
  connectKeplr: () => Promise<boolean | void>;
  connectWalletConnect: () => Promise<void>;
  disconnect: () => void;
}

export const getChainInfo = () => {
  const mainnet = {
    chainId: 'likecoin-mainnet-2',
    chainName: 'LikeCoin chain',
    rpc: 'https://mainnet-node.like.co/rpc/',
    rest: 'https://mainnet-node.like.co',
    stakeCurrency: {
      coinDenom: 'LIKE',
      coinMinimalDenom: 'nanolike',
      coinDecimals: 9,
      coinGeckoId: 'likecoin',
    },
    walletUrlForStaking: 'https://stake.like.co',
    bip44: {
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: 'cosmos',
      bech32PrefixAccPub: 'cosmospub',
      bech32PrefixValAddr: 'cosmosvaloper',
      bech32PrefixValPub: 'cosmosvaloperpub',
      bech32PrefixConsAddr: 'cosmosvalcons',
      bech32PrefixConsPub: 'cosmosvalconspub',
    },
    currencies: [
      {
        coinDenom: 'LIKE',
        coinMinimalDenom: 'nanolike',
        coinDecimals: 9,
        coinGeckoId: 'likecoin',
      },
    ],
    feeCurrencies: [
      {
        coinDenom: 'LIKE',
        coinMinimalDenom: 'nanolike',
        coinDecimals: 9,
        coinGeckoId: 'likecoin',
      },
    ],
    coinType: 118,
    gasPriceStep: {
      low: 1,
      average: 10,
      high: 1000,
    },
    features: ['stargate', 'ibc-transfer'],
  };

  const testnet = {
    chainId: 'likecoin-public-testnet-3',
    chainName: 'LikeCoin public test chain',
    rpc: 'https://likecoin-public-testnet-rpc.nnkken.dev/',
    rest: 'https://likecoin-public-testnet-lcd.nnkken.dev/',
    stakeCurrency: {
      coinDenom: 'EKIL',
      coinMinimalDenom: 'nanoekil',
      coinDecimals: 9,
      coinGeckoId: 'likecoin',
    },
    walletUrlForStaking: 'https://stake.like.co',
    bip44: {
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: 'cosmos',
      bech32PrefixAccPub: 'cosmospub',
      bech32PrefixValAddr: 'cosmosvaloper',
      bech32PrefixValPub: 'cosmosvaloperpub',
      bech32PrefixConsAddr: 'cosmosvalcons',
      bech32PrefixConsPub: 'cosmosvalconspub',
    },
    currencies: [
      {
        coinDenom: 'EKIL',
        coinMinimalDenom: 'nanoekil',
        coinDecimals: 9,
        coinGeckoId: 'likecoin',
      },
    ],
    feeCurrencies: [
      {
        coinDenom: 'EKIL',
        coinMinimalDenom: 'nanoekil',
        coinDecimals: 9,
        coinGeckoId: 'likecoin',
      },
    ],
    coinType: 118,
    gasPriceStep: {
      low: 0.01,
      average: 1,
      high: 1000,
    },
  };

  return isTestnet ? testnet : mainnet;
};

export const useSigningCosmWasmClient = (): ISigningCosmWasmClientContext => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [offlineSigner, setOfflineSigner] = useState<OfflineSigner | null>(null);
  const [signingClient, setSigningClient] = useState<SigningCosmWasmClient | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const connector = new WalletConnect({
    bridge: 'https://bridge.walletconnect.org',
    qrcodeModal: QRCodeModal,
    qrcodeModalOptions: {
      desktopLinks: [],
      mobileLinks: [],
    },
  });

  const suggestChain = async () => {
    if (typeof (window as any).keplr === 'undefined') {
      return;
    }

    setIsLoading(true);

    try {
      await (window as any).keplr?.experimentalSuggestChain(getChainInfo());
    } catch (ex: any) {
      setError(ex.message);
    }

    setIsLoading(false);
  };

  const disconnect = async () => {
    debug('disconnect()');

    if (signingClient) {
      signingClient.disconnect();
    }

    // const keys = await AsyncStorage.getAllKeys();
    const keys: [] = []
    const accountKeys = keys.filter(key =>
      new RegExp(`^${KEY_WALLET_CONNECT_ACCOUNT_PREFIX}`).test(key)
    );

    accountKeys.forEach(async key => {
      localStorage.removeItem(key);
    });

    localStorage.removeItem(KEY_CONNECTED_WALLET_TYPE);
    localStorage.removeItem(KEY_WALLET_CONNECT);

    if (connector.connected) {
      void connector.killSession();
    }

    setWalletAddress(null);
    setOfflineSigner(null);
    setSigningClient(null);
    setIsLoading(false);
    setError(null);
  };

  const initKepr = async () => {
    // enable website to access kepler
    await (window as any).keplr.enable(PUBLIC_CHAIN_ID);

    // get offline signer for signing txs
    const myOfflineSigner = await (window as any).getOfflineSigner(PUBLIC_CHAIN_ID);

    // make client
    const client = await SigningCosmWasmClient.connectWithSigner(
      PUBLIC_RPC_ENDPOINT,
      myOfflineSigner
    );

    setSigningClient(client);

    // get user address
    const [{ address }] = await myOfflineSigner.getAccounts();

    if (!address) return false;

    setWalletAddress(address);
    setOfflineSigner(myOfflineSigner);

    localStorage.setItem(KEY_CONNECTED_WALLET_TYPE, 'keplr');

    return true;
  };

  const initWalletConnect = async () => {
    let account: any;

    connector.on('disconnect', () => {
      debug('initWalletConnect() -> connector.on("disconnect")');

      void disconnect();
    });

    if (!connector.connected) {
      debug('initWalletConnect() -> not connected');

      await connector.connect();

      [account] = await connector.sendCustomRequest({
        id: payloadId(),
        jsonrpc: '2.0',
        method: 'cosmos_getAccounts',
        params: [PUBLIC_CHAIN_ID],
      });

      debug('initWalletConnect() -> account: %O', account);

      localStorage.setItem(
        `${KEY_WALLET_CONNECT_ACCOUNT_PREFIX}_${connector.peerId}`,
        JSON.stringify(account)
      );
    } else {
      const serializedWalletConnectAccount = localStorage.getItem(
        `${KEY_WALLET_CONNECT_ACCOUNT_PREFIX}_${connector.peerId}`
      );
      const walletConnectConnectSession = localStorage.getItem(KEY_WALLET_CONNECT);

      if (serializedWalletConnectAccount) {
        debug('initWalletConnect() -> load serialized account');

        account = JSON.parse(serializedWalletConnectAccount);
      } else if (walletConnectConnectSession) {
        // remove orphan session
        localStorage.removeItem(KEY_WALLET_CONNECT);
      }
    }

    if (!account) return false;

    const { bech32Address: address, algo, pubKey: pubKeyInHex } = account;

    if (!address || !algo || !pubKeyInHex) return false;

    const pubkey = new Uint8Array(Buffer.from(pubKeyInHex, 'hex'));
    const accounts: readonly AccountData[] = [{ address, pubkey, algo }];
    const myOfflineSigner: OfflineSigner = {
      getAccounts: () => Promise.resolve(accounts),
      signDirect: async (signerAddress, signDoc) => {
        const signDocInJSON = SignDoc.toJSON(signDoc);
        const resInJSON = await connector.sendCustomRequest({
          id: payloadId(),
          jsonrpc: '2.0',
          method: 'cosmos_signDirect',
          params: [signerAddress, signDocInJSON],
        });

        return {
          signed: SignDoc.fromJSON(resInJSON.signed),
          signature: resInJSON.signature,
        };
      },
    };

    setWalletAddress(address);
    setOfflineSigner(myOfflineSigner);

    localStorage.setItem(KEY_CONNECTED_WALLET_TYPE, 'likerland_app');

    return true;
  };

  const setupAccount = async () => {
    if (typeof (window as any).keplr === 'undefined') {
      return;
    }

    let connected = false;

    const connectedWalletType = (localStorage.getItem(
      KEY_CONNECTED_WALLET_TYPE
    )) as ConnectedWalletType;

    debug('connected() -> connectedWalletType: %s', connectedWalletType);

    setIsLoading(true);

    try {
      if (connectedWalletType === 'likerland_app') {
        connected = await initWalletConnect();
      } else if (connectedWalletType === 'keplr') {
        connected = await initKepr();
      }
    } catch (ex: any) {
      setError(ex.message);
    }

    if (!connected) {
      debug('connected(): no available connection');
    }

    setIsLoading(false);
  };

  const connectWalletConnect = async () => {
    debug('connectWalletConnect()');

    if (connector.connected) {
      return;
    }

    setIsLoading(true);

    try {
      await initWalletConnect();
    } catch (ex: any) {
      setError(ex.message);
    }

    setIsLoading(false);
  };

  const connectKeplr = async () => {
    debug('connectKeplr()');

    if (typeof (window as any).keplr === 'undefined') {
      setError('Keplr is not available');

      return;
    }

    setIsLoading(true);

    try {
      // suggest likechain
      await suggestChain();

      return await initKepr();
    } catch (ex: any) {
      setError(ex.message);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    void setupAccount();

    const keystoreChangeHandler = () => {
      const connectedWalletType = localStorage.getItem(KEY_CONNECTED_WALLET_TYPE) || 'keplr'
      if (connectedWalletType === 'keplr') {
        void initKepr();
      }
    };

    window.addEventListener('keplr_keystorechange', keystoreChangeHandler);

    return () => {
      window.removeEventListener('keplr_keystorechange', keystoreChangeHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    walletAddress,
    signingClient,
    isLoading,
    error,
    offlineSigner,
    connectKeplr,
    connectWalletConnect,
    disconnect,
  };
};
