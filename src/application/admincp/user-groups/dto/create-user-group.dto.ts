import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  IsNotEmpty,
} from 'class-validator';

export class CreateUserGroupDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsString()
  @IsNotEmpty()
  readonly name_style: string;

  @IsInt()
  @IsNotEmpty()
  readonly disp_order: number;

  @IsBoolean()
  @IsOptional()
  readonly is_banned_group?: boolean = false;

  @IsBoolean()
  @IsOptional()
  readonly can_view?: boolean = true;

  @IsBoolean()
  @IsOptional()
  readonly can_view_threads?: boolean = true;

  @IsBoolean()
  @IsOptional()
  readonly can_view_profiles?: boolean = true;

  @IsBoolean()
  @IsOptional()
  readonly can_dl_attachments?: boolean = true;

  @IsBoolean()
  @IsOptional()
  readonly can_post_threads?: boolean = true;

  @IsBoolean()
  @IsOptional()
  readonly can_post_replies?: boolean = true;

  @IsBoolean()
  @IsOptional()
  readonly can_post_attachments?: boolean = true;

  @IsBoolean()
  @IsOptional()
  readonly mod_posts?: boolean = false;

  @IsBoolean()
  @IsOptional()
  readonly mod_threads?: boolean = false;

  @IsBoolean()
  @IsOptional()
  readonly mod_edit_posts?: boolean = false;

  @IsBoolean()
  @IsOptional()
  readonly mod_attachments?: boolean = false;

  @IsBoolean()
  @IsOptional()
  readonly can_edit_posts?: boolean = true;

  @IsBoolean()
  @IsOptional()
  readonly can_delete_posts?: boolean = true;

  @IsBoolean()
  @IsOptional()
  readonly can_delete_threads?: boolean = true;

  @IsBoolean()
  @IsOptional()
  readonly can_edit_attachments?: boolean = true;

  @IsBoolean()
  @IsOptional()
  readonly can_view_member_list?: boolean = true;

  @IsBoolean()
  @IsOptional()
  readonly can_view_online?: boolean = true;

  @IsBoolean()
  @IsOptional()
  readonly can_cp?: boolean = false;

  @IsBoolean()
  @IsOptional()
  readonly is_super_mod?: boolean = false;

  @IsBoolean()
  @IsOptional()
  readonly can_search?: boolean = true;

  @IsBoolean()
  @IsOptional()
  readonly can_user_cp?: boolean = true;

  @IsBoolean()
  @IsOptional()
  readonly can_upload_avatars?: boolean = true;

  @IsBoolean()
  @IsOptional()
  readonly can_change_name?: boolean = true;

  @IsBoolean()
  @IsOptional()
  readonly can_mod_cp?: boolean = false;

  @IsBoolean()
  @IsOptional()
  readonly can_use_sig?: boolean = true;

  @IsInt()
  @Min(0)
  @Max(1440)
  @IsOptional()
  readonly edit_time_limit?: number = 60;

  @IsInt()
  @Min(0)
  @IsOptional()
  readonly max_posts?: number = 100;

  @IsBoolean()
  @IsOptional()
  readonly show_member_list?: boolean = true;

  @IsBoolean()
  @IsOptional()
  readonly can_ban_users?: boolean = true;
}
