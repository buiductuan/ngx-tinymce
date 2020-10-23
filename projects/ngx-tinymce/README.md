# ngx-tinymces

`Now compatible with Angular 10`

## Usage

First, install tinymce and this lib via npm:
```
npm install --save tinymce ngx-tinymces
```

Then copy lightgray skin files from `node_modules/tinymce` to the `/assets` folder. So, i.e. there must be available `/assets/tinymce/skins/lightgray/skin.min.css` and `/assets/tinymce/skins/lightgray/content.min.css` file.
You can override skin path by specifying `skin_url` option (default `/assets/tinymce/skins/lightgray`).

To support AOT mode in Angular 9 and higher you also need to include tinymce in your scripts section in angular.json config file:
```json
 "scripts": [
    "node_modules/tinymce/tinymce.min.js",
    ...
]
```

Import `TinymceModule` in you `app.module.ts` like this:
```typescript
import { TinymceModule } from 'ngx-tinymces';

@NgModule({
  imports: [
    ...
    TinymceModule.withConfig({})
  ],
  ...
})
export class AppModule { }
```

Then use it:
```html
<app-tinymce [formControl]='contentControl'></app-tinymce>
```
or
```html
<app-tinymce [(ngModel)]='content'></app-tinymce>
```

You can also use template variable `tinymce` to get instance of tinymce:
```html
<app-tinymce [(ngModel)]='content' #tinymce='tinymce'></app-tinymce>
```
then in component.ts:
```typescript
@ViewChild('tinymce') tinymce;
ngAfterViewInit() {
  console.log(this.tinymce);
}
```

## Configure
You can configure TinyMCE globally:
```typescript
import { TinymceModule } from 'ngx-tinymces';

@NgModule({
  imports: [
    ...
    TinymceModule.withConfig({
      ...  //any TinyMCE config here
    })
  ],
  ...
})
export class AppModule { }
```
Please note that config is extended a bit.

- Besides the original config ngx-tinymces supports `baseURL` for providing, i.e., custom plugins paths.

- `auto_focus` option is boolean instead of string.
- You cannot specify `selector` option (and you don't need to, right?).
- `setup` and `init_instance_callback` are executed after the components'.

Also you can override options in each instance like that:
```html
<app-tinymce [(ngModel)]='title' [options]='{ branding:false }'></app-tinymce>
```

## Plugins
If you need other plugins than standart (`link paste table advlist autoresize lists code`) you should create plugins folder in the `baseURL` (default `'/assets/tinymce'`) and place your plugins in it.

**Example:** 
Place emoticons plugin to an `/assets/tinymce/plugins` folder, then:
```typescript
import { TinymceModule } from 'ngx-tinymces';

@NgModule({
  imports: [
    ...
    TinymceModule.withConfig({
      plugins: ['emoticons'],
      toolbar: 'emoticons'
    })
  ],
  ...
})
export class AppModule { }
```

Alternativaly you can `npm install tinymce --save` and import plugins like that:
```typescript
import 'tinymce/plugins/emoticons/plugin.js';
```
