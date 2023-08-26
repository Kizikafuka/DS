class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(item) {
        this.items.push(item);
    }

    dequeue() {
        if (this.isEmpty()) {
            return "Queue kosong. Silahkan masukkan item terlebih dahulu";
        }
        return this.items.shift();
    }
    
    swapItems(index1, index2) {
        if (this.isEmpty()) {
            console.log("Queue kosong. Tidak dapat melanjutkan operasi swap.");
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

const queue = new Queue();

const menu = `
Queue Menu:
1. Enqueue
2. Dequeue
3. Swap
4. Size Queue
5. Display Queue
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
                    queue.enqueue(item);
                    console.log(`Item '${item}' Item berhasil dimasukkan.`);
                    console.log(`Queue: ${queue.display()}`); // memunculkan isi queue setelah ditambahkan item
                    askChoice(); // agar kembali ke menu setelah fungsi telah digunakan
                    }
                });
                break;

            case '2':
                const dequeuedItem = queue.dequeue();
                console.log(`Item yang dikeluarkan: ${dequeuedItem}`);

                if (!queue.isEmpty()) {
                    console.log(`Queue: ${queue.display()}`);
                } else {
                    
                }

                askChoice();
                break;

            case '3':
                if (queue.size() < 2) {
                    console.log("Anda memerlukan setidaknya 2 item dalam antrian untuk melakukan swap");
                    askChoice();
                } else {
                    console.log(`Queue: ${queue.display()}`);
                    rl.question("Masukkan index 1 untuk ditukar: ", (index1) => {
                        rl.question("Masukkan index 2 untuk ditukar: ", (index2) => {
                            queue.swapItems(parseInt(index1), parseInt(index2));
                            console.log(`Queue: ${queue.display()}`);
                            askChoice();
                     });
                    }); 

                }
               break;

            case '4':
                if (queue.isEmpty()) {
                    console.log("Antrian masih kosong. Tambahkan item untuk bisa melihat size dari antrian.");
                    askChoice();
                } else {
                console.log(`Queue size: ${queue.size()}`);
                askChoice();
                }
                break;

            case '5':
                if (queue.isEmpty()) {
                    console.log("Antrian kosong, silahkan tambahkan item pada antrian terlebih dahulu.");
                    askChoice();
                } else {
                console.log(`Queue: ${queue.display()}`);
                askChoice();
                }
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
