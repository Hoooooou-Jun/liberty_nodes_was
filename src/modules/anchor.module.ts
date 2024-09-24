import { Module, Global } from '@nestjs/common';
import { AnchorProvider } from '../providers/anchor.provider.js';

@Global()
@Module({
  providers: [AnchorProvider],
  exports: [AnchorProvider],
})
export class AnchorModule {}