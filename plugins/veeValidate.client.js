import { defineRule } from "vee-validate";
import * as allRules from "@vee-validate/rules";

import { configure } from "vee-validate";
import { localize, setLocale } from "@vee-validate/i18n";
import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json";

Object.keys(allRules.all).forEach((rule) => {
  defineRule(rule, allRules.all[rule]);
});

configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});
setLocale("zh_TW");

// 用來封裝 plugin
export default defineNuxtPlugin((nuxtApp) => {});
