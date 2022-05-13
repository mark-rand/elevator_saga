{

    init: function(elevators, floors) {
        let MAX_FLOORS = floors.length - 1;

        elevators.map(function (elevator, index, floors) {
            elevator.on("idle", function () {
                console.log("IDLE. Elevator number" + index);
            });

            elevator.on("stopped_at_floor", function () {
                console.log("STOPPED AT FLOOR. Evelator number" + index);
            });

            elevator.on("floor_button_pressed", function (floorNum) {
                console.log("Floor button pressed");
                elevator.goToFloor(floorNum);
            });

        });


        const addFloorToIdlestElevator = function (floorNum, goingUp, elevators) {
            bestScoreElevator = undefined;
            bestScore = 100;
            elevators.map(function (elevator, index) {
                console.log(elevator);
                score = elevator.loadFactor() * elevator.destinationQueue.length;
                if (elevator.destinationQueue.indexOf(floorNum) > -1 && elevator.loadFactor() < 0.5) {
                    return false;
                }
                console.log("Elevator index " + index + ". Score is " + score);
                if (score < bestScore) {
                    console.log("Best score so far");
                    bestScoreElevator = elevator;
                    bestScore=score;
                }
            });
            if (typeof (bestScoreElevator) != "undefined") {

                bestScoreElevator.goToFloor(floorNum);
            }

        }

        floors.map(function (floor, index) {
            floor.on("up_button_pressed", function () {
                console.log("Up button pressed on floor " + floor.floorNum());
                addFloorToIdlestElevator(floor.floorNum(), true, elevators);

            });
            floor.on("down_button_pressed", function () {
                console.log("Up button pressed on floor " + floor.floorNum());
                addFloorToIdlestElevator(floor.floorNum(), false, elevators);
            });
        });

    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}
