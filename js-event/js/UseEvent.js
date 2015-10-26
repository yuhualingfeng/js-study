/**
 * Created by Administrator on 2015/10/9.
 */

/*
 * event�������Ժͷ���:
 * type �¼�����
 * target �¼�Ŀ��
 * currentTarget ��ǰ�¼�Ŀ��
 * preventDefault() ��ֹĬ����Ϊ
 * stopPropagation() ��ֹ�¼�ð�ݺͲ���
 *
 * IE��event���������
 * cancelBubble Ϊtrueʱ,ȡ���¼�ð��
 * returnValue Ϊfalseʱ,��ֹĬ����Ϊ
 * srcElement ��ǰ�¼�Ŀ��
 * type �¼�����
 * */

/*
 * onclick this����֧��
 * html�¼�������� this����֧��
 * addEventListener this����֧��
 * attachEvent thisָ��window
 * */


var EventUtil = {
//添加事件监听
    addEventHandler: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        }
        else if (element.attachEvent) {
            element.attachEvent('on' + type, handler);
        }
        else {
            element['on' + type] = handler;
        }
    },
    //移除事件监听
    removeEventHandler: function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        }
        else if (element.detachEvent) {
            element.detachEvent('on' + type, handler);
        }
        else {
            element['on' + type] = null;
        }
    },
    //获取event对象
    getEvent: function(event) {
        return event ? event : window.event;
    },
    //获取目标对象
    getTarget: function(event) {
        return event.target || event.srcElement;
    },
    //阻止默认行为
    preventDefault: function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        }
        else {
            event.returnValue = false;
        }
    },
    //阻止事件冒泡
    stopPropagation: function(event) {
        if (event.stopPropagation)
        {
            event.stopPropagation();
        }
        else {
            event.cancelBubble = true;
        }
    },
    //在发生 mouseover 和mouserout 事件时,获取相关元素
    getRelatedTarget: function(event) {
        if (event.relatedTarget) {
            return event.relatedTarget;
        } else if (event.toElement) {
            return event.toElement;
        } else if (event.fromElement) {
            return event.fromElement;
        } else {
            return null;
        }
    },
    //发生click事件,返回 0 表示主鼠标按钮，1 表示中间的鼠标按钮（鼠标滚轮按钮），2 表示次鼠标按钮
    getButton: function(event) {
        if (document.implementation.hasFeature("MouseEvents", "2.0")) {
            return event.button;
        } else {
            switch (event.button) {
                case 0:
                case 1:
                case 3:
                case 5:
                case 7:
                    return 0;
                case 2:
                case 6:
                    return 2;
                case 4:
                    return 1;
            }
        }
    },
    //发生mousewheel事件,获取滚轮的增量值
    getWheelDelta: function(event) {
        if (event.wheelDelta) {
            return (client.engine.opera && client.engine.opera < 9.5 ?
                    -event.wheelDelta : event.wheelDelta);
        } else {
            return -event.detail * 40;
        }
    },
    //发生keypress事件,返回键码
    getCharCode: function(event) {
        if (typeof event.charCode == "number") {
            return event.charCode;
        } else {
            return event.keyCode;
        }
    }

};