import "@stdlib/deploy";

message CounterValue {
    amount: Int as uint32;
}

contract Counter with Deployable {
    id: Int as uint32;
    counter: Int as uint32;

    init(id: Int) {
        self.id = id;
        self.counter = 0;
    }

    // Step 4
    receive("increment") {
        self.counter = (self.counter + 1);
        self.reply(CounterValue{amount: self.counter}.toCell());
    }

    // Step 2
    receive("query") {
        self.reply(CounterValue{amount: self.counter}.toCell());
    }

    get fun counter(): Int {
        return self.counter;
    }

    get fun id(): Int {
        return self.id;
    }
}
