import { Component, OnDestroy, AfterViewInit, forwardRef, NgZone, Inject, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { TinymceDefaultOptions } from './tinymce-default-options.interface';
import { TinymceOptions } from './tinymce-options.interface';

import 'tinymce/tinymce.min';

declare var tinymce: any;

import 'tinymce/themes/modern/theme';
import 'tinymce/plugins/link/plugin.js';
import 'tinymce/plugins/paste/plugin.js';
import 'tinymce/plugins/table/plugin.js';
import 'tinymce/plugins/advlist/plugin.js';
import 'tinymce/plugins/autoresize/plugin.js';
import 'tinymce/plugins/lists/plugin.js';
import 'tinymce/plugins/code/plugin.js';

const noop = () => { };

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-tinymce',
  template: '<div id="{{elementId}}"></div>',
  exportAs: 'tinymce',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TinymceComponent),
      multi: true
    }
  ]
})
export class TinymceComponent implements ControlValueAccessor, AfterViewInit, OnInit, OnDestroy {
  // tslint:disable-next-line:no-input-rename
  @Input('options') optionsOverride: TinymceOptions;
  // tslint:disable-next-line:no-output-native
  @Output() click = new EventEmitter();
  // tslint:disable-next-line:no-output-native
  @Output() dblclick = new EventEmitter();
  // tslint:disable-next-line:no-output-native
  @Output() mousedown = new EventEmitter();
  // tslint:disable-next-line:no-output-native
  @Output() mouseup = new EventEmitter();
  // tslint:disable-next-line:no-output-native
  @Output() mousemove = new EventEmitter();
  // tslint:disable-next-line:no-output-native
  @Output() mouseover = new EventEmitter();
  // tslint:disable-next-line:no-output-native
  @Output() mouseout = new EventEmitter();
  // tslint:disable-next-line:no-output-native
  @Output() mouseenter = new EventEmitter();
  // tslint:disable-next-line:no-output-native
  @Output() mouseleave = new EventEmitter();
  // tslint:disable-next-line:no-output-native
  @Output() keydown = new EventEmitter();
  // tslint:disable-next-line:no-output-native
  @Output() keypress = new EventEmitter();
  // tslint:disable-next-line:no-output-native
  @Output() keyup = new EventEmitter();
  // tslint:disable-next-line:no-output-native
  @Output() contextmenu = new EventEmitter();
  // tslint:disable-next-line:no-output-native
  @Output() paste = new EventEmitter();
  @Output() init = new EventEmitter();
  // tslint:disable-next-line:no-output-native
  @Output() focus = new EventEmitter();
  // tslint:disable-next-line:no-output-native
  @Output() blur = new EventEmitter();
  @Output() beforeSetContent = new EventEmitter();
  @Output() setContent = new EventEmitter();
  @Output() getContent = new EventEmitter();
  @Output() preProcess = new EventEmitter();
  @Output() postProcess = new EventEmitter();
  @Output() nodeChange = new EventEmitter();
  @Output() undo = new EventEmitter();
  @Output() redo = new EventEmitter();
  // tslint:disable-next-line:no-output-native
  @Output() change = new EventEmitter();
  @Output() dirty = new EventEmitter();
  @Output() remove = new EventEmitter();
  @Output() execCommand = new EventEmitter();
  @Output() pastePreProcess = new EventEmitter();
  @Output() pastePostProcess = new EventEmitter();

  public elementId: string = 'tiny-' + Math.random().toString(36).substring(2);
  public editor: any;

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;
  private innerValue: string;

  private options: TinymceOptions;

  constructor(
    private zone: NgZone,
    @Inject('TINYMCE_CONFIG') private globalOptions: TinymceOptions
  ) {

  }

  ngOnInit() {
    this.options = Object.assign(new TinymceDefaultOptions(), this.globalOptions, this.optionsOverride);
    this.options.selector = '#' + this.elementId;
    this.options.setup = (editor: any) => {
      this.setupEvents(editor);
    };
    this.options.init_instance_callback = (editor: any) => {
      if (editor && this.value) {
        editor.setContent(this.value);
      }
      this.editor = editor;
    };
  }

  ngAfterViewInit() {
    if (this.options.baseURL) {
      tinymce.baseURL = this.options.baseURL;
    }
    tinymce.init(this.options);
  }

  // get accessor
  get value(): any {
    return this.innerValue;
  }

  // set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.zone.run(() => {
        this.onChangeCallback(v);
      });
    }
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
      if (!value) {
        value = '';
      }
      if (this.editor && this.editor.initialized) {
        this.editor.setContent(value);
      }
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  setupEvents(editor: any) {
    editor.on('change keyup', () => {
      const content = editor.getContent();
      this.value = content;
    });
    editor.on('click', (e: any) => {
      this.click.emit(e);
    });
    editor.on('dblclick', (e: any) => {
      this.dblclick.emit(e);
    });
    editor.on('mousedown', (e: any) => {
      this.mousedown.emit(e);
    });
    editor.on('mouseup', (e: any) => {
      this.mouseup.emit(e);
    });
    editor.on('mousemove', (e: any) => {
      this.mousemove.emit(e);
    });
    editor.on('mouseover', (e: any) => {
      this.mouseover.emit(e);
    });
    editor.on('mouseout', (e: any) => {
      this.mouseout.emit(e);
    });
    editor.on('mouseenter', (e: any) => {
      this.mouseenter.emit(e);
    });
    editor.on('mouseleave', (e: any) => {
      this.mouseleave.emit(e);
    });
    editor.on('keydown', (e: any) => {
      this.keydown.emit(e);
    });
    editor.on('keypress', (e: any) => {
      this.keypress.emit(e);
    });
    editor.on('keyup', (e: any) => {
      this.keyup.emit(e);
    });
    editor.on('contextmenu', (e: any) => {
      this.contextmenu.emit(e);
    });
    editor.on('paste', (e: any) => {
      this.paste.emit(e);
    });
    editor.on('init', (e: any) => {
      this.init.emit(e);
    });
    editor.on('focus', (e: any) => {
      this.focus.emit(e);
    });
    editor.on('blur', (e: any) => {
      this.blur.emit(e);
    });
    editor.on('BeforeSetContent', (e: any) => {
      this.beforeSetContent.emit(e);
    });
    editor.on('SetContent', (e: any) => {
      this.setContent.emit(e);
    });
    editor.on('GetContent', (e: any) => {
      this.getContent.emit(e);
    });
    editor.on('PreProcess', (e: any) => {
      this.preProcess.emit(e);
    });
    editor.on('PostProcess', (e: any) => {
      this.postProcess.emit(e);
    });
    editor.on('NodeChange', (e: any) => {
      this.nodeChange.emit(e);
    });
    editor.on('Undo', (e: any) => {
      this.undo.emit(e);
    });
    editor.on('Redo', (e: any) => {
      this.redo.emit(e);
    });
    editor.on('Change', (e: any) => {
      this.change.emit(e);
    });
    editor.on('Dirty', (e: any) => {
      this.dirty.emit(e);
    });
    editor.on('Remove', (e: any) => {
      this.remove.emit(e);
    });
    editor.on('ExecCommand', (e: any) => {
      this.execCommand.emit(e);
    });
    editor.on('PastePreProcess', (e: any) => {
      this.pastePreProcess.emit(e);
    });
    editor.on('PastePostProcess', (e: any) => {
      this.pastePostProcess.emit(e);
    });
  }

  private onMemoryClean() {
    if (this.elementId) {
      delete this.elementId;
    }
    if (this.editor) {
      delete this.editor;
    }
  }

  ngOnDestroy() {
    // remove DOM
    document.getElementById(this.elementId).remove();
    tinymce.remove(this.editor);
    this.onMemoryClean();
  }

}

