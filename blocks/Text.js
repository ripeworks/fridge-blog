import React from "react";
import { HtmlContent } from "fridge-next";
import css from "./Text.module.css";

export default function Text({ content }) {
  return <HtmlContent className={css.text} content={content} />;
}
