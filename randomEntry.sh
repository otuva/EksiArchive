#!/bin/bash

clear -x

db=$1
author=$2

create_link() {
	url=$1
	text=$2

	echo -e '\e]8;;'${url}'\a'${text}'\e]8;;\a'
	# printf '\e]8;;'${url}'\e\\'${text}'\e]8;;\e\\\n'
}


format_output() {
	string=$1

	entry_id=$(echo ${string} | cut -d'|' -f1)
	entry_id=$(create_link "https://eksisozluk.com/entry/${entry_id}" "Entry Link")

	title=$(echo ${string} | cut -d'|' -f2)

	content=$(echo ${string} | cut -d'|' -f3)
	content=$(echo "${content}" | html2text -ascii)

	favorite_count=$(echo ${string} | cut -d'|' -f4)
	author=$(echo ${string} | cut -d'|' -f5)
	date_created=$(echo ${string} | cut -d'|' -f6)

	echo -e "${entry_id}\n==========\n${title}\n-----\n\n${content}\n\n-----\n\e[42m${favorite_count}\e[0m\t-\t${author}\t-\t${date_created}\n=========="
}

main() {
	entry=$(sqlite3 ${db} <<- EOF
		SELECT entry_id,title,content,favorite_count,author,date_created FROM data WHERE author='${author}' ORDER BY RANDOM() LIMIT 1;
		.exit
		EOF
	)

	format_output "${entry}"
	#formatted_output=$(format_output "${entry}")

	#echo -e "${formatted_output}"
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
