type Table = (string | number | boolean | null)[][];

namespace CSV {
    export function parse(text: string): Table {
        let i = 0, rv: Table = [], line = [], tmp = "", isText = false;
        while (i <= text.length) {
            if (text[i] == '"') {
                isText = true;
                i++;
                while (i < text.length) {
                    if (text[i] == '"') {
                        if (text[i + 1] == '"') {
                            tmp += '"';
                            i += 2;
                        } else {
                            break
                        }
                    } else {
                        tmp += text[i];
                        i++;
                    }
                }
            } else {
                if (text[i] == ',' || text[i] == '\n' || i == text.length) {
                    if (!isNaN(parseFloat(tmp)) && !isText) {
                        line.push(parseFloat(tmp));
                    } else {
                        line.push(tmp);
                    }
                    tmp = "";
                    isText = false;
                } else {
                    tmp += text[i];
                }
                if (text[i] == '\n' || i == text.length) {
                    rv.push(line);
                    line = [];
                }
            }
            i++;
        }
        return rv;
    }

    export function stringify(data: Table, minify: boolean = false): string {
        let text = "";
        for (let y = 0; y < data.length; y++) {
            for (let x = 0; x < data[y].length; x++) {
                let cell = data[y][x];
                if (cell == null || cell == "") {
                    text += '""';
                } else {
                    cell = cell.toString().replace(/"/g, '""');
                    if (cell.search(minify ? /"|,/g : / |,|"/g) != -1) {
                        cell = '"' + cell + '"';
                    }
                    text += cell;
                }
                if (x != data[y].length - 1) text += ',';
            }
            if (data[y].length == 0) text += ',';
            if (y != data.length - 1) text += '\n';
        }
        return text;
    }
}