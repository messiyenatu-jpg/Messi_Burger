/**
 * Frontend Testing Suite for Zoma Burger House
 * Run these tests in browser console or integrate with testing framework
 */

// Test Configuration
const TEST_CONFIG = {
    baseUrl: 'http://localhost:8080/zoma-burger',
    testUser: {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
        phone: '+251911234567'
    }
};

// Utility Functions
function log(message, type = 'info') {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${type.toUpperCase()}] ${message}`);
}

function assert(condition, message) {
    if (!condition) {
        log(`ASSERTION FAILED: ${message}`, 'error');
        throw new Error(message);
    }
    log(`ASSERTION PASSED: ${message}`, 'success');
}

// Form Validation Tests
class FormValidationTests {
    static testEmailValidation() {
        log('Testing email validation...');
        
        const validEmails = [
            'test@example.com',
            'user.name@domain.co.uk',
            'admin@zomaburger.com'
        ];
        
        const invalidEmails = [
            'invalid-email',
            '@domain.com',
            'test@',
            'test.com',
            ''
        ];
        
        validEmails.forEach(email => {
            assert(validateEmail(email), `Valid email should pass: ${email}`);
        });
        
        invalidEmails.forEach(email => {
            assert(!validateEmail(email), `Invalid email should fail: ${email}`);
        });
        
        log('Email validation tests completed');
    }
    
    static testPasswordValidation() {
        log('Testing password validation...');
        
        const validPasswords = ['password123', 'StrongPass1', 'MyP@ssw0rd'];
        const invalidPasswords = ['123', 'pass', ''];
        
        validPasswords.forEach(password => {
            assert(validatePassword(password), `Valid password should pass: ${password}`);
        });
        
        invalidPasswords.forEach(password => {
            assert(!validatePassword(password), `Invalid password should fail: ${password}`);
        });
        
        log('Password validation tests completed');
    }
}

// Cart Functionality Tests
class CartTests {
    static testAddToCart() {
        log('Testing add to cart functionality...');
        
        // Clear cart first
        clearCart();
        assert(getCartItemCount() === 0, 'Cart should be empty initially');
        
        // Add item to cart
        addToCart(1, 'Classic Burger', 250.00, 2);
        assert(getCartItemCount() === 2, 'Cart should have 2 items');
        
        log('Add to cart tests completed');
    }
    
    static testCartTotal() {
        log('Testing cart total calculation...');
        
        clearCart();
        addToCart(1, 'Classic Burger', 250.00, 2); // 500.00
        addToCart(2, 'Cheeseburger', 280.00, 1);   // 280.00
        
        const expectedTotal = 780.00;
        const actualTotal = getCartTotal();
        
        assert(Math.abs(actualTotal - expectedTotal) < 0.01, 
               `Cart total should be ${expectedTotal}, got ${actualTotal}`);
        
        log('Cart total calculation tests completed');
    }
}

// AJAX Tests
class AjaxTests {
    static async testLoginAjax() {
        log('Testing AJAX login...');
        
        const loginData = {
            email: TEST_CONFIG.testUser.email,
            password: TEST_CONFIG.testUser.password
        };
        
        try {
            const response = await fetch(`${TEST_CONFIG.baseUrl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(loginData)
            });
            
            assert(response.status === 200 || response.status === 302, 
                   'Login should return success status');
            
            log('AJAX login test completed');
        } catch (error) {
            log(`AJAX login test failed: ${error.message}`, 'error');
        }
    }
}

// Test Runner
class TestRunner {
    static async runAllTests() {
        log('Starting frontend test suite...');
        
        try {
            FormValidationTests.testEmailValidation();
            FormValidationTests.testPasswordValidation();
            CartTests.testAddToCart();
            CartTests.testCartTotal();
            await AjaxTests.testLoginAjax();
            
            log('All frontend tests completed successfully!', 'success');
            
        } catch (error) {
            log(`Test suite failed: ${error.message}`, 'error');
        }
    }
}

// Export for use in browser console
window.ZomaBurgerTests = {
    TestRunner,
    FormValidationTests,
    CartTests,
    AjaxTests
};