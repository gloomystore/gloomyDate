"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// gloomyDate.ts
var gloomyDate_exports = {};
__export(gloomyDate_exports, {
  default: () => gloomyDate_default
});
module.exports = __toCommonJS(gloomyDate_exports);
var gloomyDate = {
  date: function(input, lang) {
    let timestamp;
    const language = lang != null ? lang : "en";
    if (typeof input === "number") {
      timestamp = input > 1e10 ? input : input * 1e3;
    } else if (typeof input === "string") {
      timestamp = this.parseStringToTimestamp(input);
      if (isNaN(timestamp)) {
        console.warn(`Unsupported string format: ${input}`);
        return String(input);
      }
    } else if (input instanceof Date) {
      timestamp = input.getTime();
      if (isNaN(timestamp)) {
        console.warn(`Invalid Date object: ${input}`);
        return input.toString();
      }
    } else {
      console.warn(`Unsupported input type: ${typeof input}`);
      return String(input);
    }
    const unit = {
      ko: ["\uB144 \uC804", "\uB2EC \uC804", "\uC77C \uC804", "\uC2DC\uAC04 \uC804", "\uBD84 \uC804", "\uBC29\uAE08 \uC804", "\uB144 \uD6C4", "\uB2EC \uD6C4", "\uC77C \uD6C4", "\uC2DC\uAC04 \uD6C4", "\uBD84 \uD6C4", "\uC7A0\uC2DC \uD6C4"],
      en: ["years ago", "months ago", "days ago", "hours ago", "minutes ago", "now", "years later", "months later", "days later", "hours later", "minutes later", "moments later"],
      jp: ["\u5E74\u524D", "\u6708\u524D", "\u65E5\u524D", "\u6642\u9593\u524D", "\u5206\u524D", "\u4ECA", "\u5E74\u5F8C", "\u6708\u5F8C", "\u65E5\u5F8C", "\u6642\u9593\u5F8C", "\u5206\u5F8C", "\u5C11\u3057\u5F8C"]
    };
    const now = this.newDate();
    const differ = Math.floor((timestamp - now) / 1e3);
    if (differ === 0) return `${unit[language][5]}`;
    const absDiffer = Math.abs(differ);
    const years = Math.floor(absDiffer / 31536e3);
    const months = Math.floor(absDiffer / 2592e3);
    const days = Math.floor(absDiffer / 86400);
    const hours = Math.floor(absDiffer / 3600);
    const minutes = Math.floor(absDiffer / 60);
    if (differ > 0) {
      if (years > 1) return `${years} ${unit[language][6]}`;
      else if (months > 1) return `${months} ${unit[language][7]}`;
      else if (days > 1) return `${days} ${unit[language][8]}`;
      else if (hours > 1) return `${hours} ${unit[language][9]}`;
      else if (minutes > 1) return `${minutes} ${unit[language][10]}`;
      else return `${unit[language][11]}`;
    } else {
      if (years > 1) return `${years} ${unit[language][0]}`;
      else if (months > 1) return `${months} ${unit[language][1]}`;
      else if (days > 1) return `${days} ${unit[language][2]}`;
      else if (hours > 1) return `${hours} ${unit[language][3]}`;
      else if (minutes > 1) return `${minutes} ${unit[language][4]}`;
      else return `${unit[language][5]}`;
    }
  },
  parseStringToTimestamp: function(str) {
    if (/^\d{14}$/.test(str)) {
      const formatted = str.replace(
        /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
        "$1-$2-$3T$4:$5:$6"
      );
      return new Date(formatted).getTime();
    }
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(str)) {
      return new Date(str).getTime();
    }
    if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(str)) {
      return new Date(str.replace(" ", "T")).getTime();
    }
    if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
      return new Date(str).getTime();
    }
    if (/^\d{4}\/\d{2}\/\d{2}/.test(str)) {
      return new Date(str).getTime();
    }
    if (/^\d{2}\/\d{2}\/\d{4}/.test(str)) {
      return new Date(str).getTime();
    }
    const timestamp = new Date(str).getTime();
    return timestamp;
  },
  newDate: function() {
    return (/* @__PURE__ */ new Date()).getTime();
  },
  // 하위 호환성을 위해 남겨둠
  isDateTimeFormat: function(str) {
    const regex = /^\d{14}$/;
    return regex.test(str);
  },
  isLegacyFormat: function(str) {
    const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    return regex.test(str);
  }
};
var gloomyDate_default = gloomyDate;
