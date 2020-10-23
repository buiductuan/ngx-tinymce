import { TinymceOptions } from './tinymce-options.interface';

export class TinymceDefaultOptions implements TinymceOptions {
  plugins = [
    'link',
    'paste',
    'table',
    'advlist',
    'autoresize',
    'lists',
    'code'
  ];
  // tslint:disable-next-line:variable-name
  skin_url = '/assets/tinymce/skins/lightgray';
  baseURL = '/assets/tinymce';
  // tslint:disable-next-line:variable-name
  auto_focus = true;
}
