import { describe, expect, it } from "vitest";
import { stripVisibleUntrustedMetadataBlocks } from "./deliver.js";

describe("stripVisibleUntrustedMetadataBlocks", () => {
  it("strips plain and role-prefixed untrusted metadata envelopes", () => {
    const text = `Before
Conversation info (untrusted metadata):
\`\`\`json
{"chat":"private"}
\`\`\`
user: Sender (untrusted metadata):
\`\`\`json
{"name":"Tadas"}
\`\`\`
assistant: Attachments (untrusted metadata):
\`\`\`json
[{"name":"photo.jpg"}]
\`\`\`
After`;

    expect(stripVisibleUntrustedMetadataBlocks(text)).toBe("Before\n\nAfter");
  });

  it("strips metadata fences with common markdown fence variants", () => {
    const text = `Before
Sender (UNTRUSTED METADATA):
\`\`\`JSON   
{"name":"Tadas"}
\`\`\`   
After`;

    expect(stripVisibleUntrustedMetadataBlocks(text)).toBe("Before\n\nAfter");
  });

  it("leaves normal text intact", () => {
    expect(stripVisibleUntrustedMetadataBlocks("hello\nworld")).toBe("hello\nworld");
  });
});
