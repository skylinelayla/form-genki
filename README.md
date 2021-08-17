### form-genki
🐲 A form generator based on a json data [genki-dama: 元げん気き玉だま] 

⚠️⚠️ Update: 2019-10-15 support select type & support set FormData.  
⚠️⚠️ Update: 2019-10-13 support checkbox/radio input type.  
⚠️⚠️ Update: 2019-10-11 support multi form container in one page.  
⚠️⚠️ Update: 2019-10-10 this library only support input form render, other form type will be soon added.  


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
    import * as FormGen from 'form-genki'; // or you can import below
    import { Render } from 'form-genki';
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
* set form data.
```javascript
    form.setFormData({
        name1: 'value1',
        name2: 'value2'
    });
```
* theme set: you can cover class name to use your own css.

#### data structure
```json
    [
    {
        "properties": [
            {
                "name": "DummyText",
                "variable": "variable",
                "defaultValue": null,
                "defaultValueFrom": null,
                "type": "TEXT",
                "blockId": "0",
                "columnSize": 6,
                "styleClass": "form-control",
                "labelText": {
                    "zh-CN": "请输入"
                },
                "labelRawHtml": "",
                "hintText": {
                    "zh-CN": "提示信息"
                },
                "items": [],
                "callApi": null,
                "required": true,
                "visible": true,
                "readonly": false
            },
            {
                "name": "DummyText2",
                "variable": "variable2",
                "defaultValue": null,
                "defaultValueFrom": null,
                "type": "SELECT",
                "blockId": "0",
                "columnSize": 6,
                "styleClass": "form-control",
                "labelText": {
                    "zh-CN": "请选择",
                    "en-US": "please choose"
                },
                "labelRawHtml": "",
                "hintText": {
                    "zh-CN": "提示信息"
                },
                "items": [
                    {
                        "text": {
                            "zh-CN": "选择1",
                            "en-US": "choose1"
                        },
                        "value": 1
                    },
                    {
                        "text": {
                            "zh-CN": "选择2",
                            "en-US": "choose2"
                        },
                        "value": 2
                    }
                ],
                "callApi": null,
                "required": true,
                "visible": true,
                "readonly": false
            }
        ],
        "tables": []
    },
    {
        "id": "abcd",
        "properties": [
            {
                "name": "DummyCombo",
                "variable": "variable",
                "defaultValue": null,
                "defaultValueFrom": null,
                "type": "RADIO",
                "blockId": "1",
                "columnSize": 12,
                "labelText": {
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
                    },
                    {
                        "text": {
                            "en-US": "Choice1",
                            "zh-CN": "选择1"
                        },
                        "value": 0
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