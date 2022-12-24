#!/bin/bash

PSQL="psql --username=freecodecamp --dbname=salon --tuples-only -c"

MAIN_MENU() {

  # Resending message
  if [[ $1 ]]
  then
    echo -e "$1\n"
  fi

  # Main menu
  echo "How may i help you today?"
  SERVICES=$($PSQL "SELECT service_id, name FROM services")
  echo "$SERVICES" | while read SERVICE_ID BAR NAME
  do
    echo "$SERVICE_ID) $NAME"
  done
  echo "5) EXIT"

  # Select service
  read SERVICE_ID_SELECTED

  if [[ $SERVICE_ID_SELECTED == 5 ]]
  then
    EXIT
  fi


  # if input not a number
  if [[ ! $SERVICE_ID_SELECTED =~ ^[0-9]+$ ]]
  then
    # send to main menu
    MAIN_MENU "That's not a valid service number."
  fi

  # get service
  SERVICE_NAME=$($PSQL "SELECT name FROM services WHERE service_id = $SERVICE_ID_SELECTED")
  # if not a service
  if [[ -z $SERVICE_NAME ]]
  then
    # send to main menu
    MAIN_MENU "That's not a valid service."
  else
    # send to service menu
    SERVICE_MENU $SERVICE_NAME $SERVICE_ID_SELECTED
  fi

}

SERVICE_MENU() {
  # echo "$1"
  # get customer phone
  echo -e "\nWhat's yout phone number?"
  read CUSTOMER_PHONE

  # get customer_id
  CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone ='$CUSTOMER_PHONE'")

  # if not found
  if [[ -z $CUSTOMER_ID ]]
  then
    # ask for name
    echo -e "\nI could not find your record, what's your name?"
    read CUSTOMER_NAME

    # store name and phone
    INSERT_CUSTOMER_RESULT=$($PSQL "INSERT INTO customers(phone, name) VALUES('$CUSTOMER_PHONE', '$CUSTOMER_NAME')")

    # get customer_id
    CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone ='$CUSTOMER_PHONE'")
  else
    # show customer info
    CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE phone = '$CUSTOMER_PHONE'")
    echo -e "\nHello,$CUSTOMER_NAME"
  fi

  # ask for appointment time
  echo -e "\nWhat's time would you like to mark your appointment?"
  read SERVICE_TIME

  # Insert appointment
  INSERT_APPOINTMENT_RESULT=$($PSQL "INSERT INTO appointments(customer_id, service_id, time) VALUES($CUSTOMER_ID, $2, '$SERVICE_TIME')")

  # print output
  echo -e "\nI have put you down for a $1 at $SERVICE_TIME, $CUSTOMER_NAME."
  exit 0
}

EXIT() {
  echo -e "\nGoodbye"
  exit 0
}

echo -e "\n~~~~ Kazu's Salon ~~~~\n"
MAIN_MENU