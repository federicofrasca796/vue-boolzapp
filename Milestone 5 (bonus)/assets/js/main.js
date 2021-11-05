/* Milestone 1
● Replica della grafica con la possibilità di avere messaggi scritti dall’utente (verdi) e
dall’interlocutore (bianco) assegnando due classi CSS diverse
● Visualizzazione dinamica della lista contatti: tramite la direttiva v-for, visualizzare
nome e immagine di ogni contatto
*/

/* Milestone 2
● Visualizzazione dinamica dei messaggi: tramite la direttiva v-for, visualizzare tutti i
messaggi relativi al contatto attivo all’interno del pannello della conversazione
● Click sul contatto mostra la conversazione del contatto cliccato
*/

/* Milestone 3
● Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e digitando
“enter” il testo viene aggiunto al thread sopra, come messaggio verde
● Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà
un “ok” come risposta, che apparirà dopo 1 secondo.
*/

/* Milestone 5 - opzionale
● Cancella messaggio: cliccando sul messaggio appare un menu a tendina che
permette di cancellare il messaggio selezionato
● Visualizzazione ora e ultimo messaggio inviato/ricevuto nella lista dei contatti
*/

/*  */

const app = new Vue({
    el: '#app',
    data: {
        user: {
            name: 'Federico Frascà',
            avatar: '_io',
        },

        contacts: [
            {
            name: 'Michele',
            avatar: '_1',
            visible: true,
            lastseen: dayjs().format('DD/MM/YYYY HH:mm:ss'),
            messages: [
                {
                date: '10/01/2020 15:30:55',
                text: 'Hai portato a spasso il cane?',
                status: 'sent',
                msgPopup: false,

                },
                {
                date: '10/01/2020 15:50:00',
                text: 'Ricordati di dargli da mangiare',
                status: 'sent',
                msgPopup: false,

                },
                {
                date: '10/01/2020 16:15:22',
                text: 'Tutto fatto!',
                status: 'received',
                msgPopup: false,

                }
                ],
            select: true,
            },

            {
            name: 'Fabio',
            avatar: '_2',
            visible: true,
            lastseen: dayjs().format('DD/MM/YYYY HH:mm:ss'),
            messages: [
                {
                date: '20/03/2020 16:30:00',
                text: 'Ciao come stai?',
                status: 'sent',
                msgPopup: false,

                },
                {
                date: '20/03/2020 16:30:55',
                text: 'Bene grazie! Stasera ci vediamo?',
                status: 'received',
                msgPopup: false,

                },
                {
                date: '20/03/2020 16:35:00',
                text: 'Mi piacerebbe ma devo andare a fare la spesa.',
                status: 'sent',
                msgPopup: false,

                }
                ],
            select: false,
            },

            {
            name: 'Samuele',
            avatar: '_3',
            visible: true,
            lastseen: dayjs().format('DD/MM/YYYY HH:mm:ss'),
            messages: [
                {
                date: '28/03/2020 10:10:40',
                text: 'La Marianna va in campagna',
                status: 'received',
                msgPopup: false,

                },
                {
                date: '28/03/2020 10:20:10',
                text: 'Sicuro di non aver sbagliato chat?',
                status: 'sent',
                msgPopup: false,

                },
                {
                date: '28/03/2020 16:15:22',
                text: 'Ah scusa!',
                status: 'received',
                msgPopup: false,
                }
                ],
            select: false,
            },

            {
            name: 'Luisa',
            avatar: '_4',
            visible: true,
            lastseen: dayjs().format('DD/MM/YYYY HH:mm:ss'),
            messages: [
                {
                date: '10/01/2020 15:30:55',
                text: 'Lo sai che ha aperto una nuova pizzeria?',
                status: 'sent',
                msgPopup: false,

                },
                {
                date: '10/01/2020 15:50:00',
                text: 'Si, ma preferirei andare al cinema',
                status: 'received',
                msgPopup: false,

                }
                ],
            select: false,
            },
        ],

        selectedObj: 0,
        inputMsg: '',
        inputSearch: '',
    },
   
    methods:{
        selectChat(index){
            // console.log(this.contacts[index].select);
            if (!this.select){
                //imposto select=false sugli oggetti che hanno true
                this.contacts.forEach(contact => {contact.select = false;});
                //imposto select=true per l'elemento clickato.
                this.contacts[index].select = true;
            }

            // imposto l'indice come variabile globale da poter richiamare nell'html per la selezione del contatto e della relativa chat
            this.selectedObj = index;
            
            // console.log(selectedObj);
            // richiamo nell'html tramite VueJS l'oggetto (il contatto) selezionato e inserisco le sue key nella chat.
        },

        sendMsg(){
            const selectedMsgArr = this.contacts[this.selectedObj].messages;
            // console.log(selectedMsgArr);

            const nowSent = dayjs().format('DD/MM/YYYY HH:mm:ss');
            //creo un oggetto contenente le key tipiche di 'messages'
            const newSentMsg = {
                date: nowSent,
                text: this.inputMsg,
                status: 'sent'
            }

            //pusho l'oggetto nell'array 'messages' dell'utente selezionato 
            selectedMsgArr.push(newSentMsg);
            //svuoto l'input
            this.inputMsg = '';

            //imposto un timer dopo il quale il messaggio apparirà.
            setTimeout(()=>{
                //creo la nuova data dopo che scorre il tempo impostato
                const nowReceived = dayjs().format('DD/MM/YYYY HH:mm:ss');
                //restituisco una risposta dopo un intervallo di tempo
                const newReceivedMsg = {
                    date: nowReceived, 
                    text: 'Ok.',
                    status: 'received'
                };
                selectedMsgArr.push(newReceivedMsg);
            }, 1000);
        },

        searchContact(){
            //recupero tutti i nomi dei contatti
            this.contacts.forEach(contact => {
                //se il nome include la parola nell'input:search => visible: true => attribuisco a tutti i contatti aventi 'visible: true' display block, al restante display: none.
                if (contact.name.toLowerCase().includes(this.inputSearch.toLowerCase())){
                    contact.visible = true;
                } else {
                    contact.visible = false;
                }
            });
        },

        activatePopup(message){
            // se msgPopup è false, rendilo true e attiva il popup soddisfando il requisito del v-if nell'html 
            if (!message.msgPopup) {
                this.contacts[this.selectedObj].messages.forEach(eachMessage => {
                    eachMessage.msgPopup = false
                });
                message.msgPopup = true;
            } else {
                message.msgPopup = false;
            }
        },

        deleteMsg(index){
            this.contacts[this.selectedObj].messages.splice(index, 1);
        }
    }
});
