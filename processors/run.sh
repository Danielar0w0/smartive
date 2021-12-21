#!/bin/bash

exec python3 processorsSetup.py &
exec python3 processor.py &
exec python3 randomSensor.py