### form-generate for bpezcloud system

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
* import files into your project.
```javascript
    import {Form} from 'formGen'; // for es module
    <script type="text/javascript" src="./dist/FormGen.js"></script> // for html script
```
* create a div container on your page, form will be rendered in this container.
```html
    <div id="form-container"></div>
```
* instantiate a form and then render it.
```javascript
    var form = new FormGen(data);
    form.render();
```
* check value and get value.
```javascript
    form.checkValue(function (data) {
        console.log(data);
    });
    var result = form.getValue();
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
                "columnSize": 6, // span
                "label": {
                    "zh-CN": "请输入" // label
                },
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
