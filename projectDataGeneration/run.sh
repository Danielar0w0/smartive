#!/bin/bash

exec python3 SensorSetup.py &
exec python3 humiSensor.py &
exec python3 tempSensor.py