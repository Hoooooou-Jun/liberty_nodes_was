import { Module, Global } from '@nestjs/common';
import { HeliaProvider } from '../providers/helia.provider.js';

@Global()
@Module({
  providers: [HeliaProvider],
  exports: [HeliaProvider],
})
export class HeliaModule {}