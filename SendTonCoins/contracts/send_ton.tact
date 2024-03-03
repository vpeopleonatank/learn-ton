import "@stdlib/deploy";

contract SendTon with Deployable {

    owner: Address;

    init() {
        self.owner = sender();
    }

    receive() {

    }

    receive("withdraw all") {
        require(sender() == self.owner, "only owner is allowed to withdraw");
        send(SendParameters{
            to: sender(),
            bounce: true,
            value: 0,
            mode: SendRemainingBalance + SendIgnoreErrors
        });
    }

    get fun balance(): String {
        return myBalance().toCoinsString();
    }
}
