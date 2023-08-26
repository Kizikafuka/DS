class Stack {
    constructor() {
        this.items = [];
    }

    push(item) {
        this.items.push(item);
    }

    pop() {
        if (this.isEmpty()) {
            return "Stack kosong. Tidak ada item untuk dikeluarkan.";
        }
        return this.items.pop();
    }

    swapItems(index1, index2) {
        if (this.isEmpty()) {
            console.log("Stack kosong. Tidak dapat melanjutkan operasi swap.");
            return;
        }

        if (index1 < 0 || index1 >= this.size() || index2 < 0 || index2 >= this.size()) {
            console.log("Index tidak valid.")
            return;
        }

        const temp = this.items[index1];
        this.items[index1] = this.items[index2];
        this.items[index2] = temp;

        console.log(`Data pada index ${index1} dan ${index2} telah ditukar.`);
    }

    size() {
        return this.items.length;
    }

    isEmpty() {
        return this.items.length === 0;
    }

    display() {
        return this.items.join(', ');
    }
}

const stack = new Stack();

const menu = `
Stack Menu:
1. Push
2. Pop
3. Swap
4. Size Stack
5. Display Stack
6. Exit
`;

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askChoice() {
    rl.question(menu + "\nMasukkan pilihan anda: ", (choice) => {
        switch (choice) {
            case '1':
                rl.question("Masukkan item: ", (item) => {
                    if (item.trim() === "") {
                        console.log("Item tidak boleh kosong. Silahkan masukkan item yang valid.");
                        askChoice();
                    } else {
                        stack.push(item);
                        console.log(`Item '${item}' berhasil dimasukkan.`);
                        console.log(`Stack: ${stack.display()}`);
                        askChoice();
                    }
                });
                break;

            case '2':
                const poppedItem = stack.pop();
                console.log(`Item yang dikeluarkan: ${poppedItem}`);

                if (!stack.isEmpty()) {
                    console.log(`Stack: ${stack.display()}`);
                } else {
                    console.log("Stack kosong.");
                }

                askChoice();
                break;

            case '3':
                if (stack.size() < 2) {
                    console.log("Anda memerlukan setidaknya 2 item dalam stack untuk melakukan swap.");
                    askChoice();
                } else {
                    console.log(`Stack: ${stack.display()}`);
                    rl.question("Masukkan index 1 untuk ditukar: ", (index1) => {
                        rl.question("Masukkan index 2 untuk ditukar: ", (index2) => {
                            stack.swapItems(parseInt(index1), parseInt(index2));
                            console.log(`Stack: ${stack.display()}`);
                            askChoice();
                        });
                    });

                }
                break;

            case '4':
                console.log(`Stack size: ${stack.size()}`);
                askChoice();
                break;

            case '5':
                if (stack.isEmpty()) {
                    console.log("Stack kosong.");
                } else {
                    console.log(`Stack: ${stack.display()}`);
                }
                askChoice();
                break;

            case '6':
                console.log("Program dihentikan...");
                rl.close();
                break;

            default:
                console.log("Pilihan tidak valid!. Coba lagi.");
                askChoice();
                break;
        }
    });
}

askChoice();
