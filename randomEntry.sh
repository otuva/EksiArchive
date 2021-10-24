#!/bin/bash

db=$1
author=$2

format_output() {
	string=$1

	title=$(echo ${string} | cut -d'|' -f1)

	content=$(echo ${string} | cut -d'|' -f2)

	content=$(echo "${content}" | html2text)

	echo -e "-----\n${title}\n-----\n\n${content}\n-----"
}

main() {
	entry=$(sqlite3 ${db} <<- EOF
		SELECT title,content FROM data WHERE author='${author}' ORDER BY RANDOM() LIMIT 1;
		.exit
		EOF
	)

	formatted_output=$(format_output "${entry}")

	echo "${formatted_output}"
}

if [[ -z ${db} || -z ${author} ]]; then
	echo -e "Argument(s) is missing.\nUsage: \n\tbash script.sh <database> <author>"
	exit 1

elif [[ -z "$(command -v html2text)" ]]; then
	echo -e "html2text is not installed. \nType:\n\tsudo apt install\n"
	exit 1

else
	main
	exit 0
fi