#!/bin/bash

db=$1
author=$2

bs4_url_formatting() {
	LINK_STRING='\u001b]8;;{href}\u001b\\{text}\u001b]8;;\u001b\\'
	PYTHON_CODE=$(cat <<-EOF
		from bs4 import BeautifulSoup
		html = """ ${1} """.replace('<br/>', '\n').strip()
		soup = BeautifulSoup(html, 'html.parser')
		links = soup.find_all('a', href=True)
		for link in links:
		    href = link.get('href')
		    text = link.text
		    if (href.startswith('/?q=') or href.startswith('/entry/')):
		        href = "https://eksisozluk.com{}".format(href)
		    link.replaceWith(f"${LINK_STRING}")

		print(soup)
	EOF
	)

	python3 -c "$PYTHON_CODE"
}

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

	title=$(echo ${string} | cut -d'|' -f2 | html2text -ascii)

	content=$(echo ${string} | cut -d'|' -f3)
	content=$(bs4_url_formatting "${content}") #| html2text -width 120 -ascii)

	favorite_count=$(echo ${string} | cut -d'|' -f4)
	author=$(echo ${string} | cut -d'|' -f5)
	date_created=$(echo ${string} | cut -d'|' -f6)

	echo -e "${entry_id}\n==========\n${title}\n-----\n\n${content}\n\n-----\n\e[42m${favorite_count}\e[0m\t-\t${author}\t-\t${date_created}\n=========="
}

main() {
	clear -x

	entry=$(sqlite3 ${db} <<- EOF
		SELECT entry_id,title,content,favorite_count,author,date_created FROM data WHERE author='${author}' ORDER BY RANDOM() LIMIT 1;
		.exit
		EOF
	)

	format_output "${entry}"
}

if [[ -z ${db} || -z ${author} ]]; then
	echo -e "Argument(s) is missing.\nUsage: \n\tbash script.sh <database> <author>"
	exit 1

elif [[ -z "$(command -v html2text)" ]]; then
	echo -e "html2text is not installed. \nType:\n\tsudo apt install html2text\n"
	exit 1
else
	main
	exit 0
fi