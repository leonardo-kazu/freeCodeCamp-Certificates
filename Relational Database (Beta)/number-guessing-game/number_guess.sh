#!/bin/bash

PSQL="psql --username=freecodecamp --dbname=number_guess -t --no-align -c"



echo "Enter your username:"
read USERNAME

USERNAME_ID=$($PSQL "SELECT user_id FROM users WHERE name = '$USERNAME'")

if [[ -z $USERNAME_ID ]] 
then
  echo "Welcome, $USERNAME! It looks like this is your first time here."
  USERNAME_INSERT=$($PSQL"INSERT INTO users(name) VALUES ('$USERNAME')")
else
  GAMES=$($PSQL "SELECT COUNT(*) FROM games WHERE user_id = $USERNAME_ID GROUP BY user_id")
  BEST=$($PSQL "SELECT MIN(tries) FROM games WHERE user_id = $USERNAME_ID GROUP BY user_id")
  echo "Welcome back, $USERNAME! You have played $GAMES games, and your best game took $BEST guesses."
fi
NUMBER=$(( RANDOM % 1000 + 1 ))
echo "Guess the secret number between 1 and 1000:"
read GUESS

TRIES=1


while [[ $GUESS != $NUMBER ]]
do
  if [[ ! $GUESS =~ ^[0-9]+$ ]]
    then
      echo "That is not an integer, guess again:"
    else
      if [[ $GUESS -gt $NUMBER ]]
      then
      TRIES=$(($TRIES+1))
        echo "It's lower than that, guess again:"
      elif [[ $GUESS -lt $NUMBER ]]
      then
      TRIES=$(($TRIES+1))
        echo "It's higher than that, guess again:"
      fi
    fi
  read GUESS
done
USER_ID=$($PSQL "SELECT user_id FROM users WHERE name='$USERNAME'")
INSERT_GAME=$($PSQL "INSERT INTO games(user_id,tries) VALUES($USER_ID,$TRIES)")
echo "You guessed it in $TRIES tries. The secret number was $NUMBER. Nice job!"

##########################################################################################################

# PSQL="psql --username=freecodecamp --dbname=number_guess -t --no-align -c"

# NUMBER=$(( RANDOM % 1000 + 1 ))


# echo "Enter your username:"
# read USERNAME

# USER=$($PSQL "SELECT name, best_try, games FROM users WHERE name = '$USERNAME'")

# if [[ -z $USER ]] 
# then
#   INSERT_USER=$($PSQL "INSERT INTO users(name, games, best_try) VALUES('$USERNAME', 0, 0)")
#   echo "Welcome, $USERNAME! It looks like this is your first time here."
# else
#   IFS='|' read USERNAME BEST GAMES <<< $USER
#   echo "Welcome back, $USERNAME! You have played $GAMES games, and your best game took $BEST guesses."
# fi

# TRIES=1

# echo "Guess the secret number between 1 and 1000:"
# read GUESS
# while [[ $GUESS != $NUMBER ]]
# do
#   if [[ ! $GUESS =~ ^[0-9]+$ ]]
#     then
#       echo "That is not an integer, guess again:"
#     else
#       if [[ $GUESS -gt $NUMBER ]]
#       then
#       TRIES=$(($TRIES+1))
#         echo "It's lower than that, guess again:"
#       elif [[ $GUESS -lt $NUMBER ]]
#       then
#       TRIES=$(($TRIES+1))
#         echo "It's higher than that, guess again:"
#       fi
#     fi
#     read GUESS
# done

# if [[ $BEST == 0 || -z $BEST || $BEST -gt $TRIES ]]
# then
#   UPDATE_BEST=$($PSQL "UPDATE users SET best_game = $TRIES, games = games + 1 WHERE name = '$USERNAME'")
# else
#   UPDATE_USER=$($PSQL "UPDATE users SET games = games + 1 WHERE name = '$USERNAME'")
# fi

# echo "You guessed it in $TRIES tries. The secret number was $NUMBER. Nice job!"