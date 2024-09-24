import { Provider } from '@nestjs/common';
import { createHelia, Helia } from 'helia';
import { dagCbor, DAGCBOR } from '@helia/dag-cbor';

export const HeliaProvider: Provider = {
  provide: 'HELIA_PROVIDER',
  useFactory: async (): Promise<{ helia: Helia; dagCborInstance: DAGCBOR }> => {
    const helia = await createHelia();
    console.log('your IPFS Peer ID :', helia.libp2p.peerId.toString());
    const dagCborInstance = dagCbor(helia);
    return { helia, dagCborInstance };
  },
};
