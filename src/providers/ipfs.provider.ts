import { Provider } from '@nestjs/common';
import * as Client from '@web3-storage/w3up-client'
import { StoreMemory } from '@web3-storage/w3up-client/stores/memory'
import * as Proof from '@web3-storage/w3up-client/proof'
import { Signer } from '@web3-storage/w3up-client/principal/ed25519'

export const IPFSProvider: Provider = {
  provide: 'IPFS_PROVIDER',
  useFactory: async () => {
    if (!process.env.PRIVATE_KEY || !process.env.PROOF) {
      throw new Error('PRIVATE_KEY environment variable is not defined');
    }
    const principal = Signer.parse(process.env.PRIVATE_KEY);
    const store = new StoreMemory();
    const client = await Client.create({ principal, store });
    const proof = await Proof.parse(process.env.PROOF);
    const space = await client.addSpace(proof);
    await client.setCurrentSpace(space.did());
    return client;
  },
};
