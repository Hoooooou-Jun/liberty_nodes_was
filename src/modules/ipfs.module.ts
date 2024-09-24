import { Module, Global } from '@nestjs/common';
import { HeliaProvider } from '../providers/helia.provider.js';
import { IPFSProvider } from '../providers/ipfs.provider.js';

@Global()
@Module({
  providers: [IPFSProvider],
  exports: [IPFSProvider],
})
export class IPFSModule {}