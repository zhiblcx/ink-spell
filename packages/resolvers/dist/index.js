'use strict';var o=["BookContentSetUp","BookDirectory","BookShelf","BookShelfDetail","EmptyPage","EmailInput","ErrorPage","GlobalPending","InkCard","LanguageSelect","Navigation","PersonCard","Sortable","ThemeToggle","UploadBase64Photo","UploadPhoto","SortableItem"];var u=()=>({type:"component",resolve:e=>{if(o.includes(e))return {from:"@/shared/components",name:e}}});var t=["AllSelectBookEnum","DirectoryModeEnum","EditBookShelfOpenFlagEnum","LanguageEnum","MenuEnum","MessageEnum","PaginationParamsEnum","QueryKeysEnum","ThemeEnum"];var c=()=>({type:"component",resolve:e=>{if(t.includes(e))return {from:"@/shared/enums",name:e}}});var n=["useTranslation","initReactI18next","I18nextProvider"];var d=()=>({type:"component",resolve:e=>{if(n.includes(e))return {from:"react-i18next",name:e}}});var r=["MingcuteBook5Line","MingcuteBook2Line","MingcuteHome3Line","MingcuteUser3Line"];var A=()=>({type:"component",resolve:e=>{if(r.includes(e))return {name:e,from:"~icons/mingcute/"+e.replace("Mingcute","").replace(/([0-9])([A-Z])/g,"$1-$2").replace(/([a-z])([0-9])/g,"$1-$2").replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase()}}});exports.adminIconsResolver=A;exports.clientComponentResolver=u;exports.clientEnumsResolver=c;exports.clientI18nResolver=d;//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map