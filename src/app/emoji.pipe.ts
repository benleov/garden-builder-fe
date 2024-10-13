import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { default as twemoji } from 'twemoji';

@Pipe({
  name: 'emoji'
})
export class EmojiPipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {

  }
  transform(codePoint: string): SafeHtml {

    if(!codePoint) {
      return ''
    }

    const castedCode = twemoji.convert.fromCodePoint(codePoint);
    return this.domSanitizer.bypassSecurityTrustHtml(twemoji.parse(castedCode, {
      folder: 'svg',
      ext: '.svg'
    }));
  }
}

