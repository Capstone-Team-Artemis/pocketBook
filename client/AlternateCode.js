// Switch back to this button code if decide that Host can unregister/not attend an event she created!!!


{/* If dropdown status is "Upcoming" -Or- "Attending", button should be 'Un/Register' 
                If dropdown status is "Created", button should be 'Edit/Delete' */}

                <View style={styles.registerButtonContainer}>
                {/* Dropdown menu is on either 'Upcoming' or 'Attending' */} 
                {status === 'Upcoming' || status === 'Attending' ?
                    // if logged in user is the HOST, button can only say 'Edit/Delete'
                    // else, button can also say 'Un/Register'
                    <Button
                        // check the event obj to see if logged-in user exists in the associated user array
                            // if user exists, that means user is attending and button should give 'Unregister' option
                            // else, the user isn't registered and should have the button option to 'Register' for the event
                        title={event.users[0] ? 'Unregister' : 'Register'}
                        onPress={() => {
                            event.users[0] ? this.unregister() : this.register();
                        }}
                        color="white"
                        accessibilityLabel="Status"
                    /> :
                    <Button
                        // 'Edit/Delete' button takes you to EditEvent page
                        title={'Edit/Delete'}
                        onPress={() => {
                            navigate.navigate('CreateEvent');  // needs to be switched to EditEvent once that page is created
                        }}
                        color="white"
                        accessibilityLabel="Status"
                    />
                    }