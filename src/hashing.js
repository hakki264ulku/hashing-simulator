class ListNode {
    occurence = 0
    constructor(data) {
        this.data = data
        this.next = null
    }
}

class LinkedList {
    constructor(head = null) {
        this.head = head
        this.size = 0
    }

    addNode(value) {
        let data = parseInt(value)
        // if there is any data on the linkedlist it counts the occurence instead of adding the same value again
        if (this.searchLLToFind(data) !== false) {
            this.searchLLToFind(data).occurence++ // increment the occurence value of the node
            return
        }

        let node = new ListNode(data)
        node.occurence++ // should be one because it's going to be added now

        let current

        if (this.head === null) {
            this.head = node
        } else {
            current = this.head

            while (current.next) {
                current = current.next
            }

            current.next = node
        }
        this.size++
    }

    returnArrayOfLList() {
        let arr = []
        if (this.head === null) return arr

        let current = this.head
        arr = arr.concat(current)

        while (current.next) {
            current = current.next
            arr = arr.concat(current)
        }

        return arr
    }

    removeElement(dataToRemove) {
        var current = this.head
        var prev = null

        // iterate over the list 
        while (current !== null) {

            if (current.data === dataToRemove && current.occurence === 1) {
                if (prev === null) {
                    this.head = current.next
                } else {
                    prev.next = current.next
                }
                this.size--
                return true
            } else if (current.data === dataToRemove && current.occurence > 1) {
                current.occurence--
                return true
            }
            prev = current
            current = current.next
        }
        return false
    }

    searchLLToFind(searchVal) {
        if (this.head === null) {
            return false
        }

        let current = this.head
        if (current.data === searchVal) return current

        while (current.next) {
            current = current.next
            if (current.data === searchVal) return current
        }
        return false
    }
}

// returns true if the given num is a prime number
function isPrime(num) {
    for (var i = 2; i < num; i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

// returns the next prime
function findNextPrime(previousPrime) {
    let i = previousPrime
    while (true) {
        i++
        if (isPrime(i)) {
            return i
        }
    }
}

function getSizeOfBuckets(buckets) {
    let count = 0
    buckets.forEach(bucket => {
        count += bucket.size
    });
    //console.log("count: " + count)
    return count
}

function newBucketsWithInputs(inputs, prime) {

    let newBuckets = new Array(prime)
    for (let i = 0; i < newBuckets.length; i++) {
        newBuckets[i] = new LinkedList()
    }
    inputs.forEach(input => {
        let hashValue = mod(input, prime)
        newBuckets[hashValue].addNode(input)
    });

    return newBuckets
}

function doesAnyBucketExceedsDepthLimit(buckets, depthLimit) {
    
    for (let i = 0; i < buckets.length; i++) {
        const b = buckets[i];
        if(b.size > depthLimit) return true
    }
    return false
}

function mod(n, m) {
    return ((n % m) + m) % m;
}

export {
    findNextPrime,
    getSizeOfBuckets,
    mod, newBucketsWithInputs,
    doesAnyBucketExceedsDepthLimit,

    LinkedList
}