/* eslint-disable import/no-extraneous-dependencies */
import { fixture, html } from '@open-wc/testing';

import { setViewport } from '@web/test-runner-commands';

import { visualDiff } from '@web/test-runner-visual-regression';

import {
  invalid2003doc,
  valid2003doc,
  templateIssuesDoc,
} from './scl-validating.testfiles.js';

import SclValidatingPlugin from './scl-validating.js';

const factor = window.process && process.env.CI ? 4 : 2;
function timeout(ms: number) {
  return new Promise(res => {
    setTimeout(res, ms * factor);
  });
}
mocha.timeout(2000 * factor);

setViewport({ width: 600, height: 800 });

describe('Validating menu plugin', () => {
  if (customElements.get('scl-validating') === undefined)
    customElements.define('scl-validating', SclValidatingPlugin);

  let div: HTMLElement;
  beforeEach(() => {
    div = document.createElement('div');
    div.style.width = '100%';
    div.style.height = '100%';

    document.body.prepend(div);
  });

  afterEach(async () => {
    div.remove();
  });

  describe('with missing SCL document', () => {
    let editor: SclValidatingPlugin;
    beforeEach(async () => {
      editor = await fixture(html`<scl-validating></scl-validating>`);

      document.body.prepend(editor);
    });

    afterEach(async () => {
      editor.remove();
    });

    it('looks like the latest snapshot', async () => {
      await editor.updateComplete;

      editor.dialog.show();
      await timeout(200);
      await visualDiff(document.body, `Missing-SCL-document`);
    });
  });

  describe('with loaded doc but not run validation', () => {
    let editor: SclValidatingPlugin;
    beforeEach(async () => {
      const doc = new DOMParser().parseFromString(
        invalid2003doc,
        'application/xml'
      );

      editor = await fixture(
        html`<scl-validating .doc=${doc} docName=""></scl-validating>`
      );
      document.body.prepend(editor);
    });

    afterEach(async () => {
      editor.remove();
    });

    it('looks like the latest snapshot', async () => {
      await editor.updateComplete;

      editor.dialog.show();
      await timeout(200);
      await visualDiff(document.body, `No-Validation-Run`);
    });
  });

  describe('using template validator', () => {
    const doc = new DOMParser().parseFromString(
      templateIssuesDoc,
      'application/xml'
    );

    describe('with manually run template validation', () => {
      let editor: SclValidatingPlugin;
      beforeEach(async () => {
        editor = await fixture(
          html`<scl-validating
            .doc=${doc}
            docName="InvalidTemplates"
          ></scl-validating>`
        );
        document.body.prepend(editor);
      });

      afterEach(async () => {
        editor.remove();
      });

      it('looks like the latest snapshot', async () => {
        await editor.updateComplete;

        editor.dialog.show();
        editor.manualTriggerTemplateValidator.click();

        await timeout(200);
        await visualDiff(document.body, `template/Manual-Run`);
      });
    });

    describe('with hidden template issues', () => {
      let editor: SclValidatingPlugin;
      beforeEach(async () => {
        editor = await fixture(
          html`<scl-validating
            .doc=${doc}
            docName="InvalidTemplates"
          ></scl-validating>`
        );
        document.body.prepend(editor);
      });

      afterEach(async () => {
        editor.remove();
      });

      it('looks like the latest snapshot', async () => {
        await editor.updateComplete;

        editor.run();
        editor.manualTriggerTemplateValidator.click();

        editor.expandTemplate.click();

        await timeout(200);
        await visualDiff(document.body, `template/Hidden-Issues`);
      });
    });

    describe('with enabled auto validate option', () => {
      let editor: SclValidatingPlugin;
      beforeEach(async () => {
        editor = await fixture(
          html`<scl-validating .doc=${doc}></scl-validating>`
        );
        document.body.prepend(editor);
      });

      afterEach(async () => {
        editor.remove();
      });

      it('looks like the latest snapshot', async () => {
        await editor.updateComplete;
        editor.run();

        editor.toggleAutoValidateTemplate.click();
        await editor.updateComplete;

        editor.editCount = 2;
        await timeout(200);

        await visualDiff(
          document.body,
          `template/Auto-Validate-On-EditCount-Change`
        );
      });
    });
  });

  describe('using schema validator', () => {
    const doc = new DOMParser().parseFromString(
      invalid2003doc,
      'application/xml'
    );

    describe('defaults to auto validate', () => {
      let editor: SclValidatingPlugin;
      beforeEach(async () => {
        editor = await fixture(
          html`<scl-validating
            .doc=${doc}
            docName="invalid2003"
          ></scl-validating>`
        );
        document.body.prepend(editor);
      });

      afterEach(async () => {
        editor.remove();
      });

      it('looks like the latest snapshot', async () => {
        await editor.updateComplete;

        editor.dialog.show();
        await timeout(200);
        await visualDiff(document.body, `schema/Aut-Validate-On-Open-Doc`);
      });
    });

    describe('with manually run schema validation', () => {
      let editor: SclValidatingPlugin;
      beforeEach(async () => {
        editor = await fixture(
          html`<scl-validating .doc=${doc}></scl-validating>`
        );
        document.body.prepend(editor);
      });

      afterEach(async () => {
        editor.remove();
      });

      it('looks like the latest snapshot', async () => {
        await editor.updateComplete;

        editor.dialog.show();
        editor.manualTriggerSchemaValidator.click();

        await timeout(200);
        await visualDiff(document.body, `schema/Manual-Run`);
      });
    });

    describe('with hidden schema issue', () => {
      let editor: SclValidatingPlugin;
      beforeEach(async () => {
        editor = await fixture(
          html`<scl-validating
            .doc=${doc}
            docName="invalidDoc"
          ></scl-validating>`
        );
        document.body.prepend(editor);
      });

      afterEach(async () => {
        editor.remove();
      });

      it('looks like the latest snapshot', async () => {
        await editor.updateComplete;

        await editor.run();
        editor.expandSchema.click();

        await timeout(200);
        await visualDiff(document.body, `schema/Hidden-Issues`);
      });
    });

    describe('with disabled auto validate option', () => {
      let editor: SclValidatingPlugin;
      beforeEach(async () => {
        editor = await fixture(
          html`<scl-validating .doc=${doc}></scl-validating>`
        );
        document.body.prepend(editor);
      });

      afterEach(async () => {
        editor.remove();
      });

      it('looks like the latest snapshot', async () => {
        await editor.updateComplete;

        editor.run();
        editor.toggleAutoValidateSchema.click();

        editor.editCount = 2;

        await timeout(200);
        await visualDiff(
          document.body,
          `schema/Disabled-Auto-Validate-On-EditCount-Change`
        );
      });
    });

    describe('with invalid 2003 (schema 1.7) project loaded', () => {
      let editor: SclValidatingPlugin;
      beforeEach(async () => {
        const invalid2003 = new DOMParser().parseFromString(
          invalid2003doc,
          'application/xml'
        );

        editor = await fixture(
          html`<scl-validating
            .doc=${invalid2003}
            docName="invalid2003"
          ></scl-validating>`
        );
        document.body.prepend(editor);
      });

      afterEach(async () => {
        editor.remove();
      });

      it('looks like the latest snapshot', async () => {
        await editor.updateComplete;

        editor.dialog.show();
        await timeout(200);
        await visualDiff(document.body, `schema/Invalid-Ed1`);
      });
    });

    describe('with valid 2003 (schema 1.7) project loaded', () => {
      let editor: SclValidatingPlugin;
      beforeEach(async () => {
        const valid2003 = new DOMParser().parseFromString(
          valid2003doc,
          'application/xml'
        );

        editor = await fixture(
          html`<scl-validating
            .doc=${valid2003}
            docName="valid2003"
          ></scl-validating>`
        );
        document.body.prepend(editor);
      });

      afterEach(async () => {
        editor.remove();
      });

      it('looks like the latest snapshot', async () => {
        await editor.updateComplete;

        editor.dialog.show();
        await timeout(200);
        await visualDiff(document.body, `schema/Valid-Ed1`);
      });
    });

    describe('with invalid Ed2 (2007B) project loaded', () => {
      let editor: SclValidatingPlugin;
      beforeEach(async () => {
        const invalid2003 = new DOMParser().parseFromString(
          invalid2003doc,
          'application/xml'
        );

        editor = await fixture(
          html`<scl-validating
            .doc=${invalid2003}
            docName="invalid2003"
          ></scl-validating>`
        );
        document.body.prepend(editor);
      });

      afterEach(async () => {
        editor.remove();
      });

      it('looks like the latest snapshot', async () => {
        await editor.updateComplete;

        editor.dialog.show();
        await timeout(200);
        await visualDiff(document.body, `schema/Invalid-Ed2`);
      });
    });

    describe('with valid Ed2 (2007B) project loaded', () => {
      let editor: SclValidatingPlugin;
      beforeEach(async () => {
        const valid2003 = new DOMParser().parseFromString(
          valid2003doc,
          'application/xml'
        );

        editor = await fixture(
          html`<scl-validating
            .doc=${valid2003}
            docName="valid2003"
          ></scl-validating>`
        );
        document.body.prepend(editor);
      });

      afterEach(async () => {
        editor.remove();
      });

      it('looks like the latest snapshot', async () => {
        await editor.updateComplete;

        editor.dialog.show();
        await timeout(200);
        await visualDiff(document.body, `schema/Valid-Ed2`);
      });
    });

    describe('with invalid Ed2.1 (2007B4) project loaded', () => {
      let editor: SclValidatingPlugin;
      beforeEach(async () => {
        const invalid2003 = new DOMParser().parseFromString(
          invalid2003doc,
          'application/xml'
        );

        editor = await fixture(
          html`<scl-validating
            .doc=${invalid2003}
            docName="invalid2003"
          ></scl-validating>`
        );
        document.body.prepend(editor);
      });

      afterEach(async () => {
        editor.remove();
      });

      it('looks like the latest snapshot', async () => {
        await editor.updateComplete;

        editor.dialog.show();
        await timeout(200);
        await visualDiff(document.body, `schema/Invalid-Ed21`);
      });
    });

    describe('with valid Ed2.1 (2007B4) project loaded', () => {
      let editor: SclValidatingPlugin;
      beforeEach(async () => {
        const valid2003 = new DOMParser().parseFromString(
          valid2003doc,
          'application/xml'
        );

        editor = await fixture(
          html`<scl-validating
            .doc=${valid2003}
            docName="valid2003"
          ></scl-validating>`
        );
        document.body.prepend(editor);
      });

      afterEach(async () => {
        editor.remove();
      });

      it('looks like the latest snapshot', async () => {
        await editor.updateComplete;

        editor.dialog.show();
        await timeout(200);
        await visualDiff(document.body, `schema/Valid-Ed21`);
      });
    });
  });
});
