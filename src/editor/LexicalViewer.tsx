"use client";

import React, {
  FC,
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";

import { createHeadlessEditor } from "@lexical/headless";
import { $generateHtmlFromNodes } from "@lexical/html";

/* Lexical Design System */
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";

interface Props {
  data: string;
}

async function run(value: string, callback: Dispatch<SetStateAction<string>>) {
  return new Promise((resolve) => {
    const editor = createHeadlessEditor({
      namespace: "Editor",
      nodes: [
        HeadingNode,
        ListNode,
        ListItemNode,
        QuoteNode,
        CodeNode,
        CodeHighlightNode,
        TableNode,
        TableCellNode,
        TableRowNode,
        AutoLinkNode,
        LinkNode,
      ],
      onError: () => {},
    });

    editor.setEditorState(editor.parseEditorState(value));

    editor.update(() => {
      let html = $generateHtmlFromNodes(editor, null);
      callback(html);
    });
  });
}
const empty =
  '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';
export const LexicalViewer: FC<Props> = ({ data = empty }) => {
  const [content, setContent] = useState(empty);

  useEffect(() => {
    let r = async () => {
      await run(data, setContent);
    };
    r();
  }, [data]);

  return <div dangerouslySetInnerHTML={{ __html: content ?? empty }} />;
};
