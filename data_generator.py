import random
import string
import datetime
from datetime import date
import csv

current_row = []
reference = ""

start_date = date.today()
end_date = date(2022, 12, 31)

price_list = []

# Generate prices automatically to simulate a 'Dynamic Pricing' model
def generate_prices():
    #Single Room
    price_list.append(random.randint(30, 50))
    #Double Room
    price_list.append(random.randint(50, 60))
    #Twin Room
    price_list.append(random.randint(50, 60))
    #Triple Room
    price_list.append(random.randint(60, 80))
    #Quad Room
    price_list.append(random.randint(80, 100))

# Generate a reference for the room
def generate_reference():
    reference_list = []
    num_list = "".join([str(random.randint(0,9)) for i in range(3)])
    num_list2 = "".join([str(random.randint(0,9)) for i in range(3)])
    letter_list = "".join([random.choice(string.ascii_uppercase) for i in range(6)])
    pending_reference = num_list + "-" + letter_list + "-" + num_list2

    with open('hotel_bookings_dataset.csv', mode='r', newline='') as csv_file:
        csv_reader = csv.reader(csv_file)
        for row in csv_reader:
            reference_list.append(row[6])

    if pending_reference in reference_list:
        generate_reference()
    else:
        return pending_reference

with open('hotel_bookings_dataset.csv', mode='w', newline='') as f:
    thewriter = csv.writer(f)

    thewriter.writerow(['reservation_status', 'reserved_date', 'number_of_nights', 'room_type', 'maximum_occupancy', 'price_per_night', 'reference'])

    generate_prices()

    for i in range(1, 200):
        # Generate random availability
        reserved = random.randint(1, 2)
        if reserved == 1:
            current_row.append("Reserved")
        else:
            current_row.append("Available")
            
        if "Available" not in current_row:
            # Generate random date between start and end dates
            random_date = start_date + datetime.timedelta(days=random.randrange((end_date - start_date).days))
            current_row.append(random_date.strftime("%d/%m/%y"))

            # Generate random number of nights between 1-14
            current_row.append(random.randint(1, 14))
        else:
            current_row.append(" ")
            current_row.append(" ")

        # Generate random room type, price and occupancy based off of one value
        room_type_price_occupancy = random.randint(1, 6)

        if room_type_price_occupancy <= 2:
            current_row.append("Single")
            current_row.append(2)
            current_row.append(price_list[0])
        elif room_type_price_occupancy == 3:
            current_row.append("Double")
            current_row.append(3)
            current_row.append(price_list[1])
        elif room_type_price_occupancy == 4:
            current_row.append("Twin")
            current_row.append(4)
            current_row.append(price_list[2])
        elif room_type_price_occupancy == 5:
            current_row.append("Triple")
            current_row.append(5)
            current_row.append(price_list[3])
        elif room_type_price_occupancy == 6:
            current_row.append("Quad")
            current_row.append(6)
            current_row.append(price_list[4])

        # Add reservation number to already made bookings
        if current_row[0] == "Reserved":
            current_row.append(generate_reference())
        else:
            current_row.append("");

        thewriter.writerow(current_row)
        current_row = []
        
print("Done")
