var o=["BookContentSetUp","BookDirectory","BookShelf","BookShelfDetail","EmptyPage","EmailInput","ErrorPage","GlobalPending","InkCard","LanguageSelect","Navigation","PersonCard","Sortable","ThemeToggle","UploadBase64Photo","UploadPhoto","SortableItem"];var u=()=>({type:"component",resolve:e=>{if(o.includes(e))return {from:"@/shared/components",name:e}}});var t=["AllSelectBookEnum","DirectoryModeEnum","EditBookShelfOpenFlagEnum","LanguageEnum","MenuEnum","MessageEnum","PaginationParamsEnum","QueryKeysEnum","ThemeEnum"];var a=()=>({type:"component",resolve:e=>{if(t.includes(e))return {from:"@/shared/enums",name:e}}});var r=["useTranslation","initReactI18next","I18nextProvider"];var g=()=>({type:"component",resolve:e=>{if(r.includes(e))return {from:"react-i18next",name:e}}});var n=["useActionBookStore","useEmojiStore","useLanguageStore","useMenuStore","useSetupStore","useThemeStore","useEmoticonStore"];var S=()=>({type:"component",resolve:e=>{if(n.includes(e))return {from:"@/shared/store",name:e}}});export{u as clientComponentResolver,a as clientEnumsResolver,g as clientI18nResolver,S as clientStoreResolver};//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map