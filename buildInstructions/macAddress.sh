d=$(cat /sys/class/net/en*/address)
# d1=$(echo $d | cut -d " " -f 2-)
#first_mac=`echo "${d}" | head -1`
first_mac=`echo "${d}" | head -1`
echo $first_mac
