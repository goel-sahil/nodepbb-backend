import { PartialType } from '@nestjs/mapped-types';
import { CreateThreadPrefixDto } from './create-thread-prefix.dto';

export class UpdateThreadPrefixDto extends PartialType(CreateThreadPrefixDto) {}
