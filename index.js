
function transform (quasis, fn) {
    if (Object.prototype.toString.call(fn) !== '[object Function]') {
        return;
    }

    var parts = [], elements = [], ix;

    for (ix = 0; ix < quasis.length; ix++) {
        if (quasis[ix].type === 'TemplateElement') {
            if(quasis[ix].value.raw !== quasis[ix].value.cooked) {
                return;
            }

            elements.push(quasis[ix]);
            parts.push(quasis[ix].value.raw);
        }
    }

    try {
        parts = fn(parts);
    } catch (ex) {
        console.log(ex);
        return;
    }


    if (parts.length !== elements.length) {
        return;
    }

    for (ix = 0; ix < elements.length; ix++) {
        elements[ix].value.raw    = parts[ix];
        elements[ix].value.cooked = parts[ix];
    }
}


module.exports = function (babel) {
    var t = babel.types;

    return {
        visitor: {
            CallExpression: function (path, state) {
                var node       = path.node;
                var transforms = state.opts || {};

                for (var identifier in transforms) {
                    if (t.isIdentifier(node.callee, { name: identifier })) {
                        if (t.isTemplateLiteral(node.arguments[0])) {
                            transform(node.arguments[0].quasis, transforms[identifier]);
                        } else if (t.isTaggedTemplateExpression(node.arguments[0])) {
                            transform(node.arguments[0].quasi.quasis, transforms[identifier]);
                        }

                        return path.replaceWith(node.arguments[0]);
                    }
                }
            },
            TaggedTemplateExpression: function (path, state) {
                var node = path.node;
                var transforms = state.opts || {};

                for (var identifier in transforms) {
                    if (t.isIdentifier(node.tag, { name: identifier })) {
                        transform(node.quasi.quasis, transforms[identifier]);
                        return path.replaceWith(node.quasi);
                    }
                }
            }
        }
    };
};