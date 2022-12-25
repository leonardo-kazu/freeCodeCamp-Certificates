#!/bin/bash

PSQL="psql -X --username=freecodecamp --dbname=periodic_table --tuples-only -c"

SEEK_AND_DESTROY() {
if [[ -z $ATOMIC_NUMBER_RESULT ]]
  then
    echo "I could not find that element in the database."
    exit 0
  fi

  ELEMENT=$($PSQL "SELECT symbol, name FROM elements WHERE atomic_number = $1")
  echo "$ELEMENT" | while read SYMBOL BAR NAME
  do
    PROPERTIES=$($PSQL "SELECT * FROM properties WHERE atomic_number = $1")
    echo $PROPERTIES | while read NUMBER BAR MASS BAR MELTING BAR BOILING BAR TYPE_ID
    do
      TYPE=$($PSQL "SELECT type FROM types WHERE type_id = $TYPE_ID")
      echo "The element with atomic number $1 is "$NAME" ("$SYMBOL"). It's a "$(echo $TYPE | sed -r 's/^ *| *$//g')", with a mass of $MASS amu. "$NAME" has a melting point of $MELTING celsius and a boiling point of $BOILING celsius."
    done
  done
}

if [[ -z $1 ]]
then
  echo -e "Please provide an element as an argument."
  exit 0
else
  # check for number
  if [[ $1 =~ ^[0-9]+$ ]]
  then
    ATOMIC_NUMBER_RESULT=$($PSQL "SELECT atomic_number FROM elements WHERE atomic_number = $1")
    SEEK_AND_DESTROY $ATOMIC_NUMBER_RESULT
    exit 0

  # check for Char
  elif [[ $1 =~ ^[A-Z][a-z]?$ ]]
  then
    ATOMIC_NUMBER_RESULT=$($PSQL "SELECT atomic_number FROM elements WHERE symbol = '$1'")
    SEEK_AND_DESTROY $ATOMIC_NUMBER_RESULT
    exit 0

  # check for string
  elif [[ $1 =~ ^[A-Z][a-z]+$ ]]
  then
    ATOMIC_NUMBER_RESULT=$($PSQL "SELECT atomic_number FROM elements WHERE name = '$1'")
    SEEK_AND_DESTROY $ATOMIC_NUMBER_RESULT
    exit 0
  else
    echo "I could not find that element in the database."
    exit 0
  fi
fi
exit 0

