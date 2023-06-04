namespace XML {
    export enum TokenType {
        Tag,
        CloseTag,
        AttributeName,
        AttributeValue,
        Text,
    }

    interface Token {
        type: TokenType;
        value: string;
    }

    export function parse(text: string): Token[] {
        const tokens: Token[] = [];
        let i = 0;
        let isInTag = false;
        while (i < text.length) {
            if (text[i] == '<') {
                i++;
                if (text[i] == '/') {
                    i++;
                    let tagName = "";
                    while (i < text.length && text[i] != '>') {
                        tagName += text[i++];
                    }
                    tokens.push({ type: TokenType.CloseTag, value: tagName });
                } else {
                    let tagName = "";
                    while (i < text.length && text[i] != ' ' && text[i] != '>') {
                        tagName += text[i++];
                    }
                    if (text[i] == ' ') {
                        isInTag = true;
                    }
                    tokens.push({ type: TokenType.Tag, value: tagName });
                }
            } else if (text[i] == '>') {
                isInTag = false;
            } else if (text[i] != ' ' && text[i] != '?') {
                if (isInTag) {
                    let attributeName = "";
                    while (i < text.length && text[i] != '=' && text[i] != '>') {
                        attributeName += text[i];
                        i++;
                    }
                    tokens.push({ type: TokenType.AttributeName, value: attributeName });
                    if (text[i] == '=') {
                        i++;
                        let attributeValue = "";
                        while (i < text.length && text[i] != '"' && text[i] != '>') i++;
                        i++;
                        while (i < text.length && text[i] != '"') {
                            attributeValue += text[i];
                            i++;
                        }
                        tokens.push({ type: TokenType.AttributeValue, value: attributeValue });
                    } else {
                        i--;
                    }
                } else {
                    let content = "";
                    while (i < text.length && text[i] != '<') {
                        if (text[i] == ' ' || text[i] == '\n') {
                            if (text[i - 1] != ' ') {
                                content += ' ';
                            }
                        } else {
                            content += text[i];
                        }
                        i++;
                    }
                    i--;
                    if (content != "" && content != " ") {
                        tokens.push({ type: TokenType.Text, value: content });
                    }
                }
            }
            i++;
        }
        return tokens;
    }
}