type Table = (string | number | boolean | null)[][];

namespace CSV {
    export function stringify(data: Table, minify: boolean = false): string {
        let text = "";

        for (let y = 0; y < data.length; y++) {
            for (let x = 0; x < data[y].length; x++) {
                let cell = data[y][x];
                if (cell == null || cell == "") {
                    text += '""';
                } else {
                    cell = cell.toString();
                    cell = cell.replace(/"/g, '""');
                    if (cell.search(minify ? /"|,/g : / |,|"/g) != -1) {
                        cell = '"' + cell + '"';
                    }
                    text += cell;
                }
                if (x != data[y].length - 1) {
                    text += ',';
                }
            }
            if (data[y].length == 0) {
                text += ','
            }
            if (y != data.length - 1) {
                text += '\n';
            }
        }

        return text;
    }
}