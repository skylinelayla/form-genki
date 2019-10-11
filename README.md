### form-genki
🐲 A form generator based on a json data [genki-dama: 元げん気き玉だま]  

⚠️⚠️ Update: 2019-10-10 this library only support input form render, other form type will be soon added.  
⚠️⚠️ Update: 2019-10-11 support multi form container in one page.

#### form generate provide these features
* unified data format for form definition
* flexible for using on every platform (angular & vue...)
* provide form render & form data check
* provide theme config
* i18n

#### dependency
* bootstrap (default theme or you can cover it)
* webpack

#### how to use
* npm install
```javascript
    npm i form-genki --save
```
* import files into your project.   
```javascript
    import * as FormGen from 'form-genki'
```
```html
    <script type="text/javascript" src="node_modules/form-genki/dist/FormGen.js"></script>
```
* create a div container on your page, form will be rendered in this container, or you can set custom div id attribute to render
```html
    <div id="form-container"></div>
```
* instantiate a form and then render it.
```javascript
    var Form = FormGen.Render;
    var form = new Form({
        ...data,
        containerId: 'form-container-x' // if you has one more form container
    })
    form.render();
```
* check value and get value, validate result will be shown by bootstrap hint style.
```javascript
    form.validateForm();
    var result = form.getFormData();
```
* theme set: you can cover class name to use your own css.

#### data structure
```json
    [
    {
        "id": "abcdefg", // id
        "properties": [
            {
                "name": "DummyText", // form item name
                "variable": "variable", // data binding for form item
                "defaultValue": null, // default value
                "defaultValueFrom": null,
                "type": "TEXT", // form item type
                "blockId": "0", // blockId ?
                "columnSize": 6, // span,
                "styleClass": "form-control", // form item class, default is form-control
                "labelText": {
                    "zh-CN": "请输入" // label
                },
                "labelRawHtml": "", // maybe you want insert RawHtml into label
                "hintText": {
                    "zh-CN": "提示信息" // hint
                },
                "items": [],
                "callApi": null,
                "required": true,
                "visible": true,
                "readonly": false // if readonly
            }
        ],
        "tables": [] // 表格定义
    },
    {
        "id": "abcd",
        "properties": [
            {
                "name": "DummyCombo",
                "variable": "variable",
                "defaultValue": null,
                "defaultValueFrom": null,
                "type": "V_COMBO",
                "blockId": "1",
                "columnSize": 12,
                "label": {
                    "zh-CN": "请选择"
                },
                "hintText": {},
                "items": [
                    {
                        "text": {
                            "en-US": "Choice1",
                            "zh-CN": "选择1"
                        },
                        "value": 1
                    }
                ],
                "callApi": null,
                "required": false,
                "visible": true,
                "readonly": false
            }
        ],
        "tables": []
    }
]
```

#### i18n
Support placeholder & label text i18n, just provide i18n
info like this:

``` json
    "labelText": {
        "zh-CN": "姓名",
        "en-US": "name"
    }
```
The host locale will be find in localStorage of browser. The default locale is 'zh-CN', render will monitoring storage. when you use localStorage.setItem('LANG', 'en-US'), it will trigger render to refresh form to fit new locale.