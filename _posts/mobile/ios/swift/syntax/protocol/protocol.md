프로토콜은 특정 역할을 하기 위한 메서드 프로퍼티, 기타 요구사항 등의 청사진입니다.

프로토콜은 정의를 하고 제시를 할 뿐 스스로 기능을 구현하지는 않습니다.

(자바의 인터페이스와 비슷한 개념인 것 같네요)

 

다음과 같은 형식으로 정의할 수 있습니다.

protocol RandomNumberGenerator {
    func random() -> Double
}
 

 

위의 프로토콜을 채택하면 해당 프로토콜에서 정의한 속성과 메서드를 필수적으로 구현해야 합니다.

class LinearCongruentialGenerator: RandomNumberGenerator {
    var lastRandom = 42.0
    let m = 139968.0
    let a = 3877.0
    let c = 29573.0
    func random() -> Double {
        lastRandom = ((lastRandom * a + c)
            .truncatingRemainder(dividingBy:m))
        return lastRandom / m
    }
}
 
가변 메서드의 요구
메서드가 인스턴스 내부의 값을 변경할 필요가 있는 경우 mutating을 사용합니다.

값 타입(struct, enum)의 인스턴스 메서드에서 내부의 값을 변경 할 때는 메서드의 func 앞에 mutating 키워드를 적어줘야 합니다.

프로토콜 메서드에 mutating에 적용되어 있다고 해도 클래스 구현에 있어서는 mutating을 써주지 않아도 됩니다.

protocol Togglable {
    mutating func toggle()
}

//채택시 mutating을 붙여줘야한다.
enum OnOffSwitch: Togglable {
    case off, on
    mutating func toggle() {
        switch self {
        case .off:
            self = .on
        case .on:
            self = .off
        }
    }
}


//class는 mutating을 안 붙여도 됩니다.
class OnOffSwitch: Togglable {

    func toggle() {
        ...
    }
}
 
Delegation 과 Protocol
Delegation(위임)은 클래스나 구조체가 자신의 책임을 다른 타입의 인스턴스에게 위임하는 디자인 패턴입니다.

이러한 패턴은 사용자의 특정 행동에 반응할때, 비동기 처리 등의 상황에서 쓰일 수 있습니다.

이러한 위임 패턴을 위해서 사용되는 것이 바로 프로토콜입니다.

protocol DiceGame {
    var dice: Dice { get }
    func play()
}


protocol DiceGameDelegate: AnyObject { 
    func gameDidStart(_ game: DiceGame)
    func game(_ game: DiceGame, didStartNewTurnWithDiceRoll diceRoll: Int)
    func gameDidEnd(_ game: DiceGame)
}

class SnakesAndLadders: DiceGame {
    let finalSquare = 25
    let dice = Dice(sides: 6, generator: LinearCongruentialGenerator())
    var square = 0
    var board: [Int]
    init() {
        board = Array(repeating: 0, count: finalSquare + 1)
        board[03] = +08; board[06] = +11; board[09] = +09; board[10] = +02
        board[14] = -10; board[19] = -11; board[22] = -02; board[24] = -08
    }
    weak var delegate: DiceGameDelegate?
    func play() {
        square = 0
        delegate?.gameDidStart(self)
        gameLoop: while square != finalSquare {
            let diceRoll = dice.roll()
            delegate?.game(self, didStartNewTurnWithDiceRoll: diceRoll)
            switch square + diceRoll {
            case finalSquare:
                break gameLoop
            case let newSquare where newSquare > finalSquare:
                continue gameLoop
            default:
                square += diceRoll
                square += board[square]
            }
        }
        delegate?.gameDidEnd(self)
    }
}
 

위 코드를 보시면 SnakeAndLadder에서 프로토콜을 가져와서 메서드를 실행하는 것을 볼 수 있습니다.

하지만 그에 따른 구현은 하지 않습니다.

구현은 해당 delegate를 채택한 DiceGameTracker에서 진행합니다.

class DiceGameTracker: DiceGameDelegate {
    var numberOfTurns = 0
    func gameDidStart(_ game: DiceGame) {
        numberOfTurns = 0
        if game is SnakesAndLadders {
            print("Started a new game of Snakes and Ladders")
        }
        print("The game is using a \(game.dice.sides)-sided dice")
    }
    func game(_ game: DiceGame, didStartNewTurnWithDiceRoll diceRoll: Int) {
        numberOfTurns += 1
        print("Rolled a \(diceRoll)")
    }
    func gameDidEnd(_ game: DiceGame) {
        print("The game lasted for \(numberOfTurns) turns")
    }
}
 

이렇게 동작과 구현을 나눠서 함으로써 일정 부분의 책임을 다른 인스턴스에게 넘기는 것입니다.

이때 핵심은 프로토콜을 통해서 연결된다는 사실입니다.


https://jinsangjin.tistory.com/96?category=828279