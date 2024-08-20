import { Module } from '@nestjs/common';
import { UserGroupsModule } from './user-groups/user-groups.module';
import { UserTitlesModule } from './user-titles/user-titles.module';
import { UsersModule } from './users/users.module';
import { ThreadPrefixesModule } from './thread-prefixes/thread-prefixes.module';
import { ThreadsModule } from './threads/threads.module';
import { SettingsModule } from './settings/settings.module';
import { CategoriesModule } from './categories/categories.module';
import { ForumsModule } from './forums/forums.module';

@Module({
  imports: [
    UserGroupsModule,
    UserTitlesModule,
    UsersModule,
    ThreadPrefixesModule,
    ThreadsModule,
    SettingsModule,
    CategoriesModule,
    ForumsModule,
  ],
})
export class AdmincpModule {}
