define([
    "jQuery",
    "lodash",
    "mathIt",
    "MathHelper"
], function(
    $,
    _,
    mathIt,
    MathHelper
) {
    "use strict";

    class MathNodesHelper {
        constructor(options) {
            this.operations = options.operations;
            this.nodes = new Map();
            this.mathHelper = new MathHelper();
        }

        createGraphFromRPN(rpnWithIds) {
            // var rpn = [];
            // _.each(rpnWithIds, e => {
            //     rpn.push(e.token);
            // })
            this.nodes.clear();
            var tokensAndId = _.reverse(rpnWithIds);
            var lastId = 0;
            _.each(tokensAndId, t => {
                var node = { id: lastId, origId: t.id ,label: t.token,
                    childs: [], leaf: !this.operations.find(op => op == t.token) };
                lastId++;
                this.nodes.set(t.id, node);
            });

            var stack = [];
            var curHead;
            this.nodes.forEach((node, id) => {
                curHead = _.last(stack);
                if (curHead) {
                    curHead.childs.unshift(node);
                    if (curHead.childs.length == 2) {
                        stack.pop();
                    }
                }
                if (!node.leaf) {
                    stack.push(node);
                }
            });
            return this.nodes;
        }

        getNodeById(id) {
            return this.nodes.get(+id);
        }

        calculateNode(node) {
            return mathIt[node.label](node.childs[0].label, node.childs[1].label);
        }

        isCalculatable(node) {
            // only binar operation
            if (node.childs.length == 2) {
                return node.childs[0].leaf && node.childs[1].leaf;
            }
            return false;
        }

        getNodes() {
            return this.nodes;
        }

        checkNodeValue(node, curValue) {
            return this.mathHelper.campare(curValue, this.calculateNode(node));
        }

        toLeaf(node) {
            let child1 = node.childs[0].origId;
            let child2 = node.childs[1].origId;
            this.nodes.delete(child1);
            this.nodes.delete(child2);
            delete node.childs[0];
            delete node.childs[1];
            node.childs = [];
            node.leaf = true;
        }

        getNodesNumber() {
            return this.nodes.size;
        }

        changeLabel(node, label) {
            node.label = label;
        }

        getNextOperation() {
            // if (this.nodes.size == 1) {
            //     let node = this.nodes.values.next().value;
            // }
            let node;
            this.nodes.forEach((value, key) => {
                if (this.isCalculatable(value)) {
                    node = value;
                }
            });
            return node;
        }

        getNextOperationId() {
            return this.getNextOperation().origId;
        }
    }

    return MathNodesHelper;
});
