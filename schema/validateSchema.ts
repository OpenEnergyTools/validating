/* eslint-disable import/no-extraneous-dependencies */
import { validate, Issue } from '@openenergytools/xml-schema-validator';
import { getSchema } from './schemas.js';

export async function validateSchema(
  doc: XMLDocument,
  docName: string
): Promise<Issue[] | null> {
  const [version, revision, release] = [
    doc.documentElement.getAttribute('version') ?? '',
    doc.documentElement.getAttribute('revision') ?? '',
    doc.documentElement.getAttribute('release') ?? '',
  ];

  const docContent = new XMLSerializer().serializeToString(doc);
  const schema = getSchema(version, revision, release);
  const schemaName = `SCL${version}${revision}${release}.xsd`;

  return validate(
    { content: docContent, name: docName },
    { content: schema, name: schemaName }
  );
}
